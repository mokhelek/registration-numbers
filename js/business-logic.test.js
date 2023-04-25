describe("Testing My Add Registration Number Functionality", function (){
    it("Should return a list of registration numbers (1 item)", function (){
        let regNumbersFunction = regNumbersFactory()


        regNumbersFunction.addRegNum("CA123")


        assert.deepEqual(["CA123"],regNumbersFunction.getRegistrations()); 
    })
    it("Should return a list of registration numbers (3 items )", function (){
        let regNumbersFunction = regNumbersFactory()

        
        regNumbersFunction.addRegNum("CA123")
        regNumbersFunction.addRegNum("CY123")
        regNumbersFunction.addRegNum("CF123")



        assert.deepEqual(["CA123","CY123","CF123"],regNumbersFunction.getRegistrations()); 
    })
})

describe("Testing The Filtering Functionality", function (){

    it("Should return only 2 registrations that start with 'CA' ", function (){
        let regNumbersFunction = regNumbersFactory()
        
        regNumbersFunction.addRegNum("CA123")
        regNumbersFunction.addRegNum("CY123")
        regNumbersFunction.addRegNum("CF123")
        regNumbersFunction.addRegNum("CA1515")



        assert.deepEqual(["CA123","CA1515",],regNumbersFunction.filterRegNumbers("CA")); 
    })


    it("Should return only 3 registrations that start with 'CF' ", function (){
        let regNumbersFunction = regNumbersFactory()
        
        regNumbersFunction.addRegNum("CA123")
        regNumbersFunction.addRegNum("CY123")
        regNumbersFunction.addRegNum("CF123")
        regNumbersFunction.addRegNum("CF1515")
        regNumbersFunction.addRegNum("CF26415")




        assert.deepEqual(["CF123","CF1515","CF26415"],regNumbersFunction.filterRegNumbers("CF")); 
    })
})



describe("Testing The City/Town Registration Counter Functionality", function (){

    it("Should return 2 because there are 2 Towns with CA ", function (){
        let regNumbersFunction = regNumbersFactory()
        
        regNumbersFunction.addRegNum("CA123")
        regNumbersFunction.addRegNum("CY123")
        regNumbersFunction.addRegNum("CF123")
        regNumbersFunction.addRegNum("CA1515")


        assert.equal( 2, regNumbersFunction.countForTown()["Cape Town"] ); 
    })
    it("Should return 4 because there are 4 Towns with CF (Kuils River) ", function (){
        let regNumbersFunction = regNumbersFactory()
        
        regNumbersFunction.addRegNum("CA1232")
        regNumbersFunction.addRegNum("CY123")
        regNumbersFunction.addRegNum("CF12344")
        regNumbersFunction.addRegNum("CF1233")
        regNumbersFunction.addRegNum("CF123")
        regNumbersFunction.addRegNum("CY123")
        regNumbersFunction.addRegNum("CF1253")
        regNumbersFunction.addRegNum("CA1515")


        assert.equal( 4, regNumbersFunction.countForTown()["Kuils River"] ); 
    })

})