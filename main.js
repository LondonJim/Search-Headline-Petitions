class Main {

  constructor(cleanseString = CleanseString.parse, cosineSimilarity = CosineSimilarity.compareText) {
    this.cleanseString = cleanseString
    this.cosineSimilarity = cosineSimilarity
    this.promises = []
    this.petitions = []
    this.headlines = []
    this.topPetition = 0
    this.topPetitionIndex
    this.petitionString
  }

  returnResults = () => {
    this.petitions = this.petitions.flat()
  }

  addToPetitions = (jsonResults) => {
    this.petitions.push(jsonResults)
  }

  getPetitions = () => {
    for (let i = 1; i <= 40; i++) {
      let promise = fetch(`https://petition.parliament.uk/petitions.json?page=${i}&state=open`)
              .then(results => { return results.json()})
              .then (jsonResults => {
                  this.addToPetitions(jsonResults.data)
              })
      this.promises.push(promise)
    }
  }

  execute = (headline) => {
    this.getPetitions()
    Promise.all(this.promises)
      .then(values => {
        this.returnResults()
        this.returnPetitions()
      })
  }

  returnPetitions = () => {
    for ( let i = 0; i <= this.petitions.length - 1; i++) {
      this.petitionString = this.petitions[i].attributes.action + " " + this.petitions[i].attributes.background + " " + this.petitions[i].attributes.additional_details
      this.petitionString = this.cleanseString(this.petitionString)
      this.headlines.push(this.petitionString)
    }
    return this.headlines
  }

  cosine = (headline) => {
    this.headlines.forEach((petition, index) => {
      let parsedHeadline = this.cleanseString(headline)
      let rating = this.cosineSimilarity(parsedHeadline.toLowerCase(), petition)
      if (rating > this.topPetition) {
        this.topPetition = rating
        this.topPetitionIndex = index
      }
    })
    console.log(this.topPetition)
    this.topPetition === 0 ? console.log('No match') : console.log(this.petitions[this.topPetitionIndex].attributes.action)
    this.topPetition = 0
  }

}
