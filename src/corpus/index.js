const {
  assert,
  divide,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  isString,
  isUndefined,
  log,
  set,
  sort,
} = require("@jrc03c/js-math-tools")

const { safePathJoin, safeRead, safeWrite } = require("./safe-fs")
const { shortHash, strip } = require("../helpers")
const Cache = require("./cache")

function log10(x) {
  return divide(log(x), 2.302585092994046)
}

class Corpus {
  static Cache = Cache

  static safeFs = {
    safePathJoin,
    safeRead,
    safeWrite,
  }

  static cleanText(text) {
    return strip(text)
      .split(/\s/g)
      .filter(v => v.length > 0)
      .join(" ")
  }

  static async getDocId(doc, hasAlreadyBeenCleaned) {
    assert(
      isString(doc),
      "The first argument passed into the `Corpus.getDocId` static method must be a string representing the document whose ID will be computed!"
    )

    assert(
      isUndefined(hasAlreadyBeenCleaned) || isBoolean(hasAlreadyBeenCleaned),
      "The second argument passed into the `Corpus.getDocId` static method must be undefined or a boolean indicating whether or not the first argument (a string) has already been cleaned using the `Corpus.cleanText` static method!"
    )

    if (!hasAlreadyBeenCleaned) {
      doc = Corpus.cleanText(doc)
    }

    return await shortHash(doc)
  }

  static getWordSet(text) {
    return sort(set(Corpus.cleanText(text).split(" ")))
  }

  #cache = undefined
  #cacheDir = undefined
  #docs = []
  #id = undefined

  constructor(docs, cacheDir) {
    this.docs = docs
    this.cache = new Cache()
    this.cacheDir = cacheDir
  }

  get cache() {
    return this.#cache
  }

  set cache(value) {
    assert(
      isObject(value) && value instanceof Cache,
      `The "cache" property of a \`Corpus\` instance must have a \`Cache\` instance value!`
    )

    this.#cache = value
  }

  get cacheDir() {
    return this.#cacheDir
  }

  set cacheDir(value) {
    assert(
      isUndefined(value) || isString(value),
      `The "cacheDir" property of a \`Cache\` instance must have an undefined value or a string value!`
    )

    this.#cacheDir = value
  }

  get docs() {
    return this.#docs
  }

  set docs(value) {
    assert(
      isArray(value),
      "The first argument passed into the `Corpus` constructor must be an array of strings representing the list of documents that belong in the corpus!"
    )

    assert(
      value.every(doc => isString(doc)),
      "The first argument passed into the `Corpus` constructor must be an array of strings representing the list of documents that belong in the corpus!"
    )

    this.#docs = set(value)
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
      const cleaned = Corpus.cleanText(doc)
      cleanedDocs.push(cleaned)

      const docId = await Corpus.getDocId(cleaned, true)
      docIds.push(docId)

      const words = cleaned.split(" ")
      let mostCommonWord = null
      let mostCommonWordCount = 0

      for (const word of words) {
        this.cache.incrementWordFrequencyInDoc(word, docId)
        const freq = this.cache.getWordFrequencyInDoc(word, docId)

        if (freq > mostCommonWordCount) {
          mostCommonWordCount = freq
          mostCommonWord = word
        }
      }

      this.cache.setDocWordCount(docId, words.length)
      this.cache.setDocMostCommonWord(docId, mostCommonWord)
    }

    this.#id = await Corpus.getDocId(cleanedDocs.join(" "), true)

    if (progress) {
      progress(1)
    }

    return docIds
  }

  async tf(word, docId) {
    const wordFreq = this.cache.getWordFrequencyInDoc(word, docId)
    if (wordFreq === 0) return 0

    const mostCommonWordFreq = this.cache.getDocMostCommonWordFrequency(docId)
    if (mostCommonWordFreq === 0) return 0

    return 0.5 + (0.5 * wordFreq) / mostCommonWordFreq
  }

  async idf(word) {
    const prevalence = this.cache.getDocPrevalenceForWord(word)
    return log10((this.docs.length - prevalence + 1) / (prevalence + 1))
  }

  async tfidf(word, docId) {
    return (await this.tf(word, docId)) * (await this.idf(word))
  }
}

module.exports = Corpus
