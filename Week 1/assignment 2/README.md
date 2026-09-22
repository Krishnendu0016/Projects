# React Components Practice

A small React project for practicing reusable components, props, state, event handling, and dynamic rendering.

## What it demonstrates

- Five reusable functional components: `Header`, `Footer`, `Card`, `Button`, and `Form`.
- Props for passing titles, navigation items, project details, button behavior, and footer information from parent to child components.
- `useState` in `App` for showing and hiding projects, and in `Form` for controlled form fields and submitted data.
- `.map()` for dynamically rendering navigation links and project cards.
- Conditional rendering for the project list and submitted form data.
- Parent-to-child data flow through props and child-to-parent event handling through callback props.
- Controlled inputs, form submission, and clearing the form after a successful submission.

## Run the project

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite. Use `npm run build` to create a production build.
