# Name: Task Pies

We developed an app called TaskPies to manage tasks for neurodivergent individuals. Our title and app name are derived from a task prioritization strategy that is highly recommended by psychologists called the bucket system. A bucket system benefits neurodivergent individuals since it allows them to break down large, daunting tasks into smaller, manageable tasks in categorized to-do lists. It can be challenging for neurodivergent individuals to regulate their energy and delegate tasks accordingly. The bucket system encourages them to organize tasks according to their high, medium, and low energy levels. As part of our app, we have implemented a prioritization system that uses the symbol “!” to indicate the priority level of a task and, therefore, the amount of energy needed to accomplish it. 

[Read more about the bucket system here](https://www.addept.org/living-with-adult-add-adhd/the-best-to-do-list-for-adults-with-adhd)

# Installation

To run it on your localhost, you may need to run these NPM commands:

```bash
npm install jquery --save
npm install react-scripts --save
```

## Background 

The primary reason we developed this to-do list app for neurodivergent individuals is that so many apps available today are designed exclusively for neurotypical individuals. The same productivity strategies that work for them do not work for individuals with neurodiversity. There are several task applications in the app store where the tasks are simply listed across the screen, resulting in a wall of text. People feel overwhelmed when they have so many things to do, which creates an overall feeling of helplessness. We created TaskPies with a simple UI and multiple features that target neurodivergent behavior to alleviate this issue. Our notification system is an example of this. Executive dysfunction is common in neurodivergent individuals, who are oriented toward the present rather than the future. Due to this, some neurodiverse users may simply swipe away a notification when it appears on their task apps. They may then forget about it until the day before the deadline arrives. TaskPies will notify the user multiple times throughout the day until the task has been completed. By doing so, no task will be forgotten, allowing the user to remain aware of their needs and requirements at all times. Additionally, we have created smooth animations and rewards in the app to provide the user with that small but essential dose of serotonin and dopamine. An example of this is confetti when the user finishes all their tasks.

## Supported Tasks

- Task prioritization/creation
- Reward system
- Dopamine boosts
- Tutorial
- Customization

## Technical Details

_Create React App_
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

_Progress Bar or Pie Chart_
- Made using recharts

_Design UI_
- Used Rebass to format some pages

_JQuery_
- Used on the stack data visualization page and NavBar
- We realize it is bad practice now, and in the future would like to update the app to not use JQuery

## Source

Code was created with a [todo list tutorial](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning) that we will modify more, but I tried to modify the css a bunch and it crashed. So someone who is better at css will def do better

### other notes

we have active, complete but need to add the categories for learning, personal and work. The App is still a work in progress as we have some pages that are static.

## Collaborators 
@tomrr6
@cpini2023
@bak89088

## Links to stuff used
https://reactjs.org/docs/forms.html
https://mui.com/material-ui/react-modal/
https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571
https://ionicframework.com/docs/react/your-first-app
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning
https://ionicframework.com/docs/intro/cdn
https://capacitorjs.com/docs/guides/screen-orientation
https://capacitorjs.com/docs/android
https://www.geeksforgeeks.org/create-a-pie-chart-using-recharts-in-reactjs/
https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/
