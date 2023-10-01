class Cache {
  #docs = {}
  #words = {}

  getDocWordCount(docId) {
    if (!this.#docs[docId]) {
      throw new Error(
        `The document with ID "${docId}" has not been recorded in the cache!`
      )
    }

    return this.#docs[docId].wordCount
  }

  setDocWordCount(docId, wordCount) {
    if (!this.#docs[docId]) {
      this.#docs[docId] = { mostCommonWord: undefined, wordCount: 0 }
    }

    this.#docs[docId].wordCount = wordCount
    return this
  }

  getDocMostCommonWord(docId) {
    if (!this.#docs[docId]) {
      throw new Error(
        `The document with ID "${docId}" has not been recorded in the cache!`
      )
    }

    return this.#docs[docId].mostCommonWord
  }

  setDocMostCommonWord(docId, word) {
    if (!this.#docs[docId]) {
      this.#docs[docId] = { mostCommonWord: undefined, wordCount: 0 }
    }

    this.#docs[docId].mostCommonWord = word
    return this
  }

  getDocMostCommonWordFrequency(docId) {
    const word = this.getDocMostCommonWord(docId)
    return this.getWordFrequencyInDoc(word, docId)
  }

  getDocPrevalenceForWord(word) {
    if (!this.#words[word]) return 0
    return Object.keys(this.#words[word]).length
  }

  getWordFrequencyInDoc(word, docId) {
    if (!this.#words[word]) return 0
    if (!this.#words[word][docId]) return 0
    return this.#words[word][docId]
  }

  incrementWordFrequencyInDoc(word, docId) {
    this.setWordFrequencyInDoc(
      word,
      docId,
      this.getWordFrequencyInDoc(word, docId) + 1
    )

    return this
  }

  setWordFrequencyInDoc(word, docId, count) {
    if (!this.#words[word]) {
      this.#words[word] = {}
    }

    if (!this.#words[word][docId]) {
      this.#words[word][docId] = 0
    }

    this.#words[word][docId] = count
    return this
  }
}

module.exports = Cache
