const {
  assert,
  divide,
  isArray,
  isFunction,
  isString,
  isUndefined,
  log,
} = require("@jrc03c/js-math-tools")

const { safePathJoin, safeWrite } = require("./helpers/safe-fs")
const shortHash = require("./helpers/short-hash")

function log10(x) {
  return log(x) / log(10)
}

class Corpus {
  constructor(docs, cacheDir) {
    assert(
      isArray(docs) && docs.every(doc => isString(doc)),
      "The first argument passed into the `Corpus` constructor must be an array of strings representing the list of documents that belong in the corpus!",
    )

    assert(
      isUndefined(cacheDir) || isString(cacheDir),
      "The second argument passed into the `Corpus` constructor must be undefined or a string representing a filesystem path to a cache directory (or, in the browser, a root key for use in `localStorage`)!",
    )

    this.docs = docs
    this.cache = { words: {}, docs: {} }
    this.cacheDir = cacheDir
  }

  async index(progress) {
    assert(
      isUndefined(progress) || isFunction(progress),
      "The argument passed into the `index` method must be undefined or a function that receives a value between 0 and 1!",
    )

    for (const i in this.docs) {
      if (progress) {
        progress(i / (this.docs.length - 1))
      }

      const doc = this.docs[i]
      const docId = await shortHash(doc)

      const words = strip(doc)
        .split(/\s/g)
        .filter(v => v.length > 0)

      const cleaned = words.join(" ")
      this.cache.docs[docId] = { wordCount: words.length }

      for (const j in words) {
        if (progress) {
          progress((i + j / (words.length - 1)) / (this.docs.length - 1))
        }

        const word = words[j]

        if (!this.cache.words[word]) {
          this.cache.words[word] = {}
        }

        if (!this.cache.words[word][docId]) {
          this.cache.words[word][docId] = 0
        }

        this.cache.words[word][docId]++
      }
    }

    if (this.cacheDir) {
      safeWrite(safePathJoin(this.cacheDir, corpusId + ".json"), this.cache)
    }

    progress(1)
    return this
  }

  async tf(word, doc) {
    const docId = await shortHash(doc)
    return this.cache.words[word][docId] / this.cache.docs[docId].wordCount
  }

  async idf(word) {
    try {
      return log10(
        this.docs.length / Object.keys(this.cache.words[word]).length,
      )
    } catch (e) {
      return NaN
    }
  }

  async tfidf(word, doc) {
    return (await this.tf(word, doc)) * (await this.idf(word))
  }
}

module.exports = Corpus
