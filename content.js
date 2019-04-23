let promises = []
let petitions = []
let headlines = []
let topPetition = 0
let topPetitionIndex
let petitionString

returnResults = () => {
  petitions = petitions.flat()
}

addToPetitions = (jsonResults) => {
  petitions.push(jsonResults)
}

getPetitions = () => {
  for (let i = 1; i <= 40; i++) {
    let promise = fetch(`https://petition.parliament.uk/petitions.json?page=${i}&state=open`)
            .then(results => { return results.json()})
            .then (jsonResults => {
                addToPetitions(jsonResults.data)
            })
    promises.push(promise)
  }
}

execute = () => {
  getPetitions()
  Promise.all(promises)
    .then(values => {
      returnResults()
      returnPetitions()
    })
}

returnPetitions = () => {
  for ( i = 0; i <= petitions.length - 1; i++) {
    petitionString = petitions[i].attributes.action + " " + petitions[i].attributes.background + " " + petitions[i].attributes.additional_details
    petitionString = removeStopWords(petitionString)
    headlines.push(petitionString)
  }
  return headlines
}

cosine = (headline) => {
  headlines.forEach((petition, index) => {
    parsedHeadline = removeStopWords(headline)
    rating = textCosineSimilarity(parsedHeadline.toLowerCase(), petition)
    if (rating > topPetition) {
      topPetition = rating
      topPetitionIndex = index
    }
  })
  console.log(topPetition)
  topPetition === 0 ? console.log('No match') : console.log(petitions[topPetitionIndex].attributes.action)
  topPetition = 0
}
