import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,

} from "./_DATA";

describe("./_DATA",() => {
    it('will display a success message if all dates or fiels are saved correctly', async() => {  
        var optionOneText = "optionOneText";
        var optionTwoText = "optioneTwoText"
        var author =  'author';
        var result_Obj = await _saveQuestion( { optionOneText, optionTwoText, author } );
        //toHaveProperty(keyPath): Checks if the object has a property at the given key path.
        expect(result_Obj).toHaveProperty('id');
        expect(result_Obj).toHaveProperty('author');
        expect(result_Obj).toHaveProperty('optionOne');
        expect(result_Obj).toHaveProperty('optionTwo');
        expect(result_Obj.optionOne).toHaveProperty('votes');
        expect(result_Obj.optionOne).toHaveProperty('text');
        expect(result_Obj.optionTwo).toHaveProperty('votes');
        expect(result_Obj.optionTwo).toHaveProperty('text');
        
    })

    it('will return an error if the date is not passed  _saveQuestin correct', async() => {
            var optionOneText = "optionOneText";
            var optionTwoText = "optioneTwoText"
            var author =  'author';
            await expect(_saveQuestion({ optionOneText,optionTwoText})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
            await expect(_saveQuestion({ author })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })

    it('will return the user if the id is found', async() => {
        var authedUser ='mtsamis'
        var qid = 'xj352vofupe1dqz9emx13r';
        var answer = 'optionOne'
        await expect(_saveQuestionAnswer({ authedUser, qid , answer })).resolves.toBe(true);
        await expect(_saveQuestionAnswer({ authedUser, qid , answer })).toBeTruthy();
    })
    it('the fetch fails with an error', async () => {
        var authedUser ='mtsamis'
        var qid = 'xj352vofupe1dqz9emx13r';
        var answer = 'optionOne'
        await expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toEqual("Please provide authedUser, qid, and answer");
        await expect(_saveQuestionAnswer({ answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
      });
      
      

           


    
})