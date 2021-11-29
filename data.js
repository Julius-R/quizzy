// response from api
response_code = 0;
/*
Code 0: Success Returned results successfully.
Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
Code 2: Invalid Parameter Contains an invalid parameter. Arguments passed in aren't valid. (Ex. Amount = Five)
*/

/* 
State:
    - Questions
        - Question
            - id
            - question
            - correct_answer
            - incorrect_answers
            - selected_answer

    - Answered_Wrong
        - Question
            - id
            - question
            - correct_answer
            - selected_answer

Methods:
    - addQuestion(question): This way I can edit the question object and add it to the state.
    - update_answer
    - submit_quiz
    - display_results

Screens:
    - Quiz Selector
    - Question
    - Result
    - if(answered_wrong > 0) Show Wrong Answers

*/