
export const surveyService = {
    getById
}

function getById() {
    return Promise.resolve(survey)
}

var survey =
{
    title: 'Robots Shopping',
    cmps: [
        {
            type: 'textBox',
            info: {
                label: 'Your full name:'
            }
        },
        {
            type: 'selectBox',
            info: {
                label: 'How was it:',
                opts: ['Great', 'Fine', 'Crap', 'Worst Ever']
            }
        },
        {
            type: 'textBox',
            info: {
                label: 'Your dog name:'
            }
        },        
    ]
}