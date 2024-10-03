import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,

} from "./_DATA";

describe("./_DATA",() => {
    //For the _DATA.js file, write an async unit test for _saveQuestion to verify that the saved question 
    //is returned and all expected fields are populated when correctly formatted data is passed to the function.
    it('will return and all expected fields are populated when correctly formatted data is passed to the function', async() => {  
        var optionOneText = "optionOneText";
        var optionTwoText = "optioneTwoText"
        var author =  'author';
        var result_Obj = await _saveQuestion( { optionOneText, optionTwoText, author } );
        //toHaveProperty(keyPath): Checks if the object has a property at the given key path.
       // https://stackoverflow.com/questions/72219389/jest-expect-object-not-to-have-property
        const questionsProperties = ['id', 'author', 'optionOne', 'optionTwo'];
        questionsProperties .forEach((prop) => {
            expect(result_Obj).toHaveProperty(prop);
        });
        const questionsPropertiesNested = ['votes', 'text'];
        questionsPropertiesNested.forEach((prop) => {
            expect(result_Obj.optionOne).toHaveProperty(prop);
            expect(result_Obj.optionTwo).toHaveProperty(prop);
        });

        // expect(result_Obj).toHaveProperty('id');
        // expect(result_Obj).toHaveProperty('author');
        // expect(result_Obj).toHaveProperty('optionOne');
        // expect(result_Obj).toHaveProperty('optionTwo');
        // expect(result_Obj.optionOne).toHaveProperty('votes');
        // expect(result_Obj.optionOne).toHaveProperty('text');
        // expect(result_Obj.optionTwo).toHaveProperty('votes');
        // expect(result_Obj.optionTwo).toHaveProperty('text');
        
    })
    // For the _DATA.js file, write an async unit test for _saveQuestion to
    // verify that an error is returned if incorrect data is passed to the function.
    it('an error is returned if incorrect data is passed to the function.', async() => {
            var optionOneText = "optionOneText";
            var optionTwoText = "optioneTwoText"
            var author =  'author';
            await expect(_saveQuestion({ optionOneText,optionTwoText})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
            await expect(_saveQuestion({ author })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })

    // For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that the saved question answer is 
    // returned and all expected fields are populated when correctly formatted data is passed to the function.
    it('it returns and all expected fields are populated when correctly formatted data is passed to the function', async() => {
        var authedUser ='mtsamis'
        var qid = 'xj352vofupe1dqz9emx13r';
        var answer = 'optionOne'
        await expect(_saveQuestionAnswer({ authedUser, qid , answer })).resolves.toBe(true);
        await expect(_saveQuestionAnswer({ authedUser, qid , answer })).toBeTruthy();
    })
    // For the _DATA.js file, write an async unit test for _saveQuestionAnswer
    // to verify that an error is returned if incorrect data is passed to the function.
    it('an error is returned if incorrect data is passed to the function.', async () => {
        var authedUser ='mtsamis'
        var qid = 'xj352vofupe1dqz9emx13r';
        var answer = 'optionOne'
        await expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toEqual("Please provide authedUser, qid, and answer");
        await expect(_saveQuestionAnswer({ answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
      });
      
      

           


    
})