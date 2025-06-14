# To‑Do List (React + Vite)

A to‑do app built for the **KPM Power 2025 coding challenge**. It demonstrates React fundamentals, clean state management, local persistence, and **Vitest** unit tests. You can try it out [here](https://todo.crystalshah.ca).

---

## ✨ Features

| Action                                             | Where implemented                                            |
| -------------------------------------------------- | ------------------------------------------------------------ |
| **Add** new task                                   | `Todo.add()` using an uncontrolled input ref                 |
| **Edit** task text inline                          | `ToDoItems` local `isEditing` state → `editTodo()` in parent |
| **Delete** task                                    | `deleteTodo()` removes by `id`                               |
| **Toggle Done / Undone**                           | `toggle()` flips `isComplete`                                |
| **Persist between reloads** <br><sub>(bonus)</sub> | `useEffect` syncs list to **localStorage**                   |

---

## 🏗️ How it works

```
<App>
  └─ <Todo>           // owns list state & storage
       └─ <ToDoItems> // single row w/ edit & icons
```

* **State flow** – `Todo` owns `todoList[]`. Handlers mutate it immutably; children receive callbacks via props.
* **Persistence** – On first mount we hydrate from `localStorage`; subsequent changes serialise in a second `useEffect` so reloads keep data.
* **Styling** – Tailwind utility classes + Lucide icons. No extra CSS other than Tailwind base.
* **Config** – Vite 6 for instant HMR, ESLint for hooks rules, zero‑config production build.

---

## 🧪 Testing

Unit tests live beside components as `*.test.jsx` and use **Vitest + React Testing Library**.

```bash
npm run test         # run once
npm run test:watch   # vitest --watch
npm run coverage     # vitest --coverage
```

Covered cases:

1. Renders initial empty state.
2. **Add** – simulate typing & click, assert new row appears.
3. **Edit** – switch to input, save, verify updated text.
4. **Toggle** – click checkbox, expect `line-through` class.
5. **Delete** – click trash, item disappears.
6. **Storage** – mock & assert `localStorage.setItem` called with new array.

---

## ⚡ Setup & Scripts

```bash
npm install          # deps
npm run dev          # dev server → http://localhost:5173
npm run build        # prod build in /dist
npm run preview      # serve /dist locally
```

---

## 📁 Key files

```
src/
  App.jsx – main component
  components/ – reusable UI components  
    Todo.jsx        – list logic + storage
    ToDoItems.jsx   – single task row
    ...
.tailwind.config.js – Tailwind config
.vite.config.js – Vite config
```
