const {
  assert,
  divide,
  isArray,
  isFunction,
  isString,
  isUndefined,
  log,
  set,
  sort,
} = require("@jrc03c/js-math-tools")

const { safePathJoin, safeWrite } = require("./helpers/safe-fs")
const shortHash = require("./helpers/short-hash")
const strip = require("./helpers/strip")

function log10(x) {
  return divide(log(x), log(10))
}

class Corpus {
  #id = undefined

  static clean(text) {
    return strip(text)
      .split(/\s/g)
      .filter(v => v.length > 0)
      .join(" ")
  }

  static getWordSet(text) {
    return sort(set(Corpus.clean(text).split(" ")))
  }

  constructor(docs, cacheDir) {
    assert(
      isArray(docs) && docs.every(doc => isString(doc)),
      "The first argument passed into the `Corpus` constructor must be an array of strings representing the list of documents that belong in the corpus!"
    )

    assert(
      isUndefined(cacheDir) || isString(cacheDir),
      "The second argument passed into the `Corpus` constructor must be undefined or a string representing a filesystem path to a cache directory (or, in the browser, a root key for use in `localStorage`)!"
    )

    this.docs = set(docs)
    this.cache = { words: {}, docs: {} }
    this.cacheDir = cacheDir
  }

  get id() {
    if (!this.#id) {
      throw new Error(
        "A corpus only receives its ID after indexing its documents! Please call the `index` method before requesting the corpus ID."
      )
    }

    return this.#id
  }

  set id(value) {
    if (this.#id) {
      throw new Error(
        'The "id" property of the corpus has already been set and is now read-only!'
      )
    }

    assert(
      isString(value),
      'The "id" property of a corpus can only have string values assigned to it!'
    )

    this.#id = value
  }

  async index(progress) {
    assert(
      isUndefined(progress) || isFunction(progress),
      "The argument passed into the `index` method must be undefined or a function that receives a value between 0 and 1!"
    )

    const cleanedDocs = []
    const docIds = []

    for (let i = 0; i < this.docs.length; i++) {
      if (progress) {
        progress(i / this.docs.length)
      }

      const doc = this.docs[i]
      const cleaned = Corpus.clean(doc)
      cleanedDocs.push(cleaned)

      const docId = await shortHash(cleaned)
      docIds.push(docId)

      const words = cleaned.split(" ")
      this.cache.docs[docId] = { wordCount: words.length, mostCommonWord: null }
      let mostCommonWord = null
      let mostCommonWordCount = 0

      for (const word of words) {
        if (!this.cache.words[word]) {
          this.cache.words[word] = {}
        }

        if (!this.cache.words[word][docId]) {
          this.cache.words[word][docId] = 0
        }

        this.cache.words[word][docId]++

        if (this.cache.words[word][docId] > mostCommonWordCount) {
          mostCommonWordCount = this.cache.words[word][docId]
          mostCommonWord = word
        }
      }

      this.cache.docs[docId].mostCommonWord = mostCommonWord
    }

    this.id = await shortHash(cleanedDocs.join("\n\n"))

    if (this.cacheDir) {
      safeWrite(safePathJoin(this.cacheDir, this.id + ".json"), this.cache)
    }

    progress(1)
    return docIds
  }

  async tf(word, docId) {
    if (!this.cache.words[word]) {
      return 0
    }

    if (!this.cache.docs[docId]) {
      throw new Error(
        "The document you passed into the `tf` method is not part of the corpus and was therefore not indexed!"
      )
    }

    const doc = this.cache.docs[docId]
    const wordFreq = this.cache.words[word][docId]
    const mostCommonWordFreq = this.cache.words[doc.mostCommonWord][docId]
    return 0.5 + (0.5 * wordFreq) / mostCommonWordFreq
  }

  async idf(word) {
    try {
      const docCount = Object.keys(this.cache.words[word]).length
      return log10((this.docs.length - docCount) / docCount)
    } catch (e) {
      return NaN
    }
  }

  async tfidf(word, docId) {
    return (await this.tf(word, docId)) * (await this.idf(word))
  }
}

module.exports = Corpus
