import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,

} from "../utils/_DATA";

describe("./_DATA",() => {
    //For the _DATA.js file, write an async unit test for _saveQuestion to verify that the saved question 
    //is returned and all expected fields are populated when correctly formatted data is passed to the function.
    it("should return a question with all expected fields populated when correctly formatted data is passed", async() => {  
        var optionOneText = "optionOneText";
        var optionTwoText = "optioneTwoText"
        var author =  'author';
        var result = await _saveQuestion( { optionOneText, optionTwoText, author } );

        const questionsProperties = ['id', 'author', 'optionOne', 'optionTwo'];
        questionsProperties .forEach((prop) => {
            expect(result).toHaveProperty(prop);
        });

        const questionsPropertiesNested = ['votes', 'text'];
        questionsPropertiesNested.forEach((prop) => {
            expect(result.optionOne).toHaveProperty(prop);
            expect(result.optionTwo).toHaveProperty(prop);
        });

        expect(result.optionOne.text).toBe(optionOneText);
        expect(result.optionTwo.text).toBe(optionTwoText);
        expect(result.author).toBe(author);
        
    })

    // For the _DATA.js file, write an async unit test for _saveQuestion to
    // verify that an error is returned if incorrect data is passed to the function.
    it('an error is returned if incorrect data is passed to the function.', async() => {
            const optionOneText = "Option One Text";
            const optionTwoText = "Option Two Text";
            var author =  'author';
            await expect(_saveQuestion({ optionOneText, optionTwoText})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
            await expect(_saveQuestion({ author })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
            await expect(_saveQuestion({ optionOneText, author })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
            await expect(_saveQuestion({ optionTwoText, author })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })

    // For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that the saved question answer is 
    // returned and all expected fields are populated when correctly formatted data is passed to the function.
    it('It returns and all expected fields are populated when correctly formatted data is passed to the function', async() => {
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