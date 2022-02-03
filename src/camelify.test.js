const camelify = require("./camelify.js")

test("tests `camelify`", () => {
  expect(camelify("foobarbaz")).toBe("foobarbaz")

  expect(camelify("Hello, world! My name is Josh!")).toBe(
    "helloWorldMyNameIsJosh"
  )

  expect(camelify("'42 is the number thou shalt count!'")).toBe(
    "42IsTheNumberThouShaltCount"
  )

  expect(camelify("I don't like you.")).toBe("iDontLikeYou")

  expect(camelify("howAboutNow")).toBe("howAboutNow")

  expect(camelify("heresAnotherOne_YesOrNo-orMaybeSo")).toBe(
    "heresAnotherOneYesOrNoOrMaybeSo"
  )
})
