//event propagation has two main phases:
// 1.capturing(outer to inner) - third argument true
// 2.Bubbling (inner to outer) - default (false)

//Capturing Phase
document.getElementById('outer').addEventListener('click', () => {
    alert('Outer Div (Capturing)');
}, true);

document.getElementById('middle').addEventListener('click', () => {
    alert('Middle Div (Capturing)');
}, true);

document.getElementById('inner').addEventListener('click', () => {
    alert('Inner Div (Capturing)');
}, true);

//Bubbling Phase
document.getElementById('outer').addEventListener('click', () => {
    alert('Outer Div (Bubbling)');
}, true);

document.getElementById('middle').addEventListener('click', () => {
    alert('Middle Div(Bubbling)');
}, true);

document.getElementById('inner').addEventListener('click', () => {
    alert('Inner Div (Bubbling)');
}, true);

//Button alerts
document.querySelector('#outer button').addEventListener('click', () => {
    alert('Outer Button');
});

document.querySelector('#middle button').addEventListener('click', () => {
    alert('Middle Button');
});

document.getElementById('innerBtn').addEventListener('click', (e) => {
    alert('Inner Button - Stopping Propogation');
    e.stopPropagation();
});