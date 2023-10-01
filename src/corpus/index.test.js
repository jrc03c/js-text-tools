const {
  count,
  divide,
  floor,
  isEqual,
  isString,
  isUndefined,
  log,
  max,
  random,
  range,
  sort,
} = require("@jrc03c/js-math-tools")

const { punctuation, randomString } = require("../helpers")
const Corpus = require(".")

const whitespaces = [" ", "\t", "\n", "\r", "  "]

function log10(x) {
  return divide(log(x), 2.302585092994046)
}

test("tests that the `Corpus` class works as expected", async () => {
  // Corpus.cleanText
  !(() => {
    const words = range(0, 10).map(() => randomString(floor(random() * 10 + 1)))
    const cleanewordSetTrue = words.join(" ")
    let rawDoc = ""

    for (const word of words) {
      rawDoc += word
      rawDoc += randomString(floor(random() * 3 + 1), punctuation)
      rawDoc += whitespaces[floor(random() * whitespaces.length)]
    }

    const cleanewordSetPred = Corpus.cleanText(rawDoc)
    expect(isEqual(cleanewordSetPred, cleanewordSetTrue)).toBe(true)
  })()

  // Corpus.getWordSet
  !(() => {
    const wordSetTrue = sort(
      range(0, 5).map(() => randomString(floor(random() * 10 + 1)))
    )

    const rawDoc = range(0, 100)
      .map(() => wordSetTrue[floor(random() * wordSetTrue.length)])
      .join(" ")

    const wordSetPred = Corpus.getWordSet(rawDoc)
    expect(isEqual(wordSetTrue, wordSetPred)).toBe(true)
  })()

  // Corpus constructor
  await (async () => {
    const allCharacters =
      punctuation + "abcdef1234567890" + whitespaces.join("")

    const words = range(0, 100).map(
      () => randomString(floor(random() * 10 + 1)),
      allCharacters
    )

    const docs = range(0, 10).map(() => {
      return range(0, 100)
        .map(() => words[floor(random() * words.length)])
        .join(" ")
    })

    const cleanedDocs = []
    const docIds = []
    const docWordCounts = {}

    for (const doc of docs) {
      const cleanedDoc = Corpus.cleanText(doc)
      cleanedDocs.push(cleanedDoc)

      const docId = await Corpus.getDocId(doc)
      docIds.push(docId)

      const counts = count(cleanedDoc.split(" "))
      docWordCounts[docId] = {}

      for (const c of counts) {
        docWordCounts[docId][c.value] = c.count
      }
    }

    const corpus = new Corpus(docs)
    expect(isEqual(corpus.docs, docs)).toBe(true)
    expect(isUndefined(corpus.cacheDir)).toBe(true)
    expect(corpus.cache instanceof Corpus.Cache).toBe(true)
    expect(() => corpus.id).toThrow()

    await corpus.index()

    expect(isString(corpus.id)).toBe(true)
    expect(corpus.id.length).toBe(32)

    for (const word in words) {
      for (const docId of docIds) {
        const wordCounts = docWordCounts[docId]

        expect(corpus.cache.getWordFrequencyInDoc(word, docId)).toBe(
          wordCounts[word] || 0
        )

        const occurrences = wordCounts[word]

        const mostCommonWordFreq = max(
          Object.keys(wordCounts).map(word => wordCounts[word])
        )

        const tf = await corpus.tf(word, docId)

        expect(tf).toBe(
          wordCounts[word] > 0 && mostCommonWordFreq > 0
            ? 0.5 + (0.5 * occurrences) / mostCommonWordFreq
            : 0
        )

        const prevalence = cleanedDocs
          .map(doc => doc.split(" ").filter(v => v === word))
          .filter(v => v.length > 0).length

        const idf = await corpus.idf(word)

        expect(idf).toBe(
          log10((docIds.length - prevalence + 1) / (prevalence + 1))
        )

        expect(await corpus.tfidf(word, docId)).toBe(tf * idf)
      }
    }
  })()
})
