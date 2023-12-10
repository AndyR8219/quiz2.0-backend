module.exports = function (result) {
  return {
    id: result.id,
    title: result.title,
    questions: result.questions,
    author: result.author.login,
    results: result.results,
  }
}
