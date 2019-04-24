class CosineSimilarity {

  static compareText = (strA, strB) => {
    var termFreqA = this.termFreqMap(strA);
    var termFreqB = this.termFreqMap(strB);

    var dict = {};
    this.addKeysToDict(termFreqA, dict);
    this.addKeysToDict(termFreqB, dict);

    var termFreqVecA = this.termFreqMapToVector(termFreqA, dict);
    var termFreqVecB = this.termFreqMapToVector(termFreqB, dict);

    return this.cosineSimilarity(termFreqVecA, termFreqVecB);
  }

  static termFreqMap = (str) => {
    var words = str.split(' ');
    var termFreq = {};
    words.forEach(function(w) {
      termFreq[w] = (termFreq[w] || 0) + 1;
    });
    return termFreq;
  }

  static addKeysToDict = (map, dict) => {
    for (var key in map) {
      dict[key] = true;
    }
  }

  static termFreqMapToVector = (map, dict) => {
    var termFreqVector = [];
    for (var term in dict) {
      termFreqVector.push(map[term] || 0);
    }
    return termFreqVector;
  }

  static vecDotProduct = (vecA, vecB) => {
    var product = 0;
    for (var i = 0; i < vecA.length; i++) {
      product += vecA[i] * vecB[i];
    }
    return product;
  }

  static vecMagnitude = (vec) => {
    var sum = 0;
    for (var i = 0; i < vec.length; i++) {
      sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
  }

  static cosineSimilarity = (vecA, vecB) => {
    return this.vecDotProduct(vecA, vecB) / (this.vecMagnitude(vecA) * this.vecMagnitude(vecB));
  }

}
