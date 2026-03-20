export interface Question {
  id: string;
  category: string;
  question: string;
  answer: string;
  example?: string;
}

export const categories = [
  "All",
  "General Frontend",
  "JavaScript",
  "TypeScript",
  "CSS",
  "React",
  "Next.js",
  "Performance",
  "Testing",
  "Web APIs"
];

export const questions: Question[] = [
  {
    id: "gf-1",
    category: "General Frontend",
    question: "What are the strategies we can use to optimize the performance of web applications?",
    answer: "Performance optimization involves multiple strategies:\n\n• Use CDNs to serve static assets closer to users\n• Implement lazy loading for images and components\n• Minimize and compress HTML, CSS, and JS files\n• Optimize images (compress, resize, use modern formats like WebP)\n• Use Server-Side Rendering (SSR) or Static Site Generation (SSG)\n• Reduce JavaScript bundle size with code splitting\n• Implement caching strategies\n• Optimize API calls and reduce overfetching (consider GraphQL)\n• Remove unused CSS and JavaScript",
    example: "// Lazy loading example\nconst HeavyComponent = lazy(() => import('./HeavyComponent'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <HeavyComponent />\n    </Suspense>\n  );\n}"
  },
  {
    id: "gf-2",
    category: "General Frontend",
    question: "What are Web Vitals (LCP, FID, CLS)? And how are they applied in the real world?",
    answer: "Web Vitals are standardized metrics from Google to measure user experience:\n\n• LCP (Largest Contentful Paint): Measures loading performance. Good LCP is under 2.5 seconds. It tracks when the largest visible content element is rendered.\n\n• FID (First Input Delay): Measures interactivity. Good FID is under 100ms. It measures the time from when a user first interacts with your page to when the browser responds.\n\n• CLS (Cumulative Layout Shift): Measures visual stability. Good CLS is under 0.1. It calculates unexpected layout shifts during page load.\n\nReal-world application: These metrics help identify performance issues. For example, a high CLS might indicate images without dimensions or content injected dynamically.",
    example: "<!-- Preventing CLS -->\n<img src=\"hero.jpg\" width=\"800\" height=\"600\" alt=\"Hero\" />\n\n<!-- Reserve space for dynamic content -->\n<div style=\"min-height: 200px\">\n  {/* Dynamic content loads here */}\n</div>"
  },
  {
    id: "gf-3",
    category: "General Frontend",
    question: "What is the WAI-ARIA standard?",
    answer: "WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) is a W3C specification that improves web accessibility for users with disabilities who rely on assistive technologies like screen readers.\n\nIt provides:\n• Roles (defining what an element is)\n• Properties (describing characteristics)\n• States (describing current conditions)\n\nARIA helps make dynamic content and complex UI controls accessible.",
    example: "<button \n  aria-label=\"Close dialog\" \n  aria-expanded=\"true\"\n  role=\"button\"\n>\n  ×\n</button>\n\n<nav aria-label=\"Main navigation\">\n  <ul role=\"menu\">\n    <li role=\"menuitem\">Home</li>\n  </ul>\n</nav>"
  },
  {
    id: "gf-4",
    category: "General Frontend",
    question: "In which cases is it worth building an SPA?",
    answer: "SPAs (Single Page Applications) are ideal for:\n\n• Highly interactive applications requiring app-like experience\n• Applications needing real-time updates (dashboards, chat apps)\n• Progressive Web Apps (PWAs)\n• Apps with complex state management\n• When you need fast transitions between views without page reloads\n• Rich user interfaces with frequent UI updates\n\nSPAs may NOT be ideal for:\n• Content-heavy websites needing SEO\n• Simple static websites\n• Applications where initial load time is critical"
  },
  {
    id: "js-1",
    category: "JavaScript",
    question: "What is the advantage of using a Map instead of an object?",
    answer: "Maps offer several advantages over plain objects:\n\n• Keys can be any type (objects, functions, primitives), not just strings/symbols\n• Maps maintain insertion order\n• Built-in size property\n• Better performance for frequent additions/deletions\n• Iterable by default (works with for...of)\n• No prototype chain issues",
    example: "const map = new Map();\nconst objKey = { id: 1 };\n\nmap.set(objKey, 'value');\nmap.set(123, 'number key');\nmap.set(true, 'boolean key');\n\nconsole.log(map.size); // 3\nconsole.log(map.get(objKey)); // 'value'\n\nfor (const [key, value] of map) {\n  console.log(key, value);\n}"
  },
  {
    id: "js-2",
    category: "JavaScript",
    question: "What is the difference between Map and WeakMap?",
    answer: "WeakMap differs from Map in key ways:\n\n• Keys MUST be objects (not primitives)\n• Holds weak references to keys\n• Keys can be garbage collected if no other references exist\n• Not iterable (no size, keys(), values(), or entries())\n• Useful for storing private data or metadata\n\nUse WeakMap when you want to associate data with objects without preventing garbage collection.",
    example: "const weakMap = new WeakMap();\nlet obj = { name: 'John' };\n\nweakMap.set(obj, 'metadata');\nconsole.log(weakMap.get(obj)); // 'metadata'\n\nobj = null; // Object can now be garbage collected\n\n// Use case: Private data\nconst privateData = new WeakMap();\nclass User {\n  constructor(name) {\n    privateData.set(this, { name });\n  }\n}"
  },
  {
    id: "js-3",
    category: "JavaScript",
    question: "What are closures?",
    answer: "A closure is a function that has access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing.\n\nClosures are created when:\n• A function is defined inside another function\n• The inner function references variables from the outer function\n• The inner function is returned or passed elsewhere\n\nClosures are useful for:\n• Data privacy\n• Creating function factories\n• Event handlers and callbacks\n• Maintaining state",
    example: "function createCounter() {\n  let count = 0; // Private variable\n  \n  return {\n    increment() {\n      count++;\n      return count;\n    },\n    getCount() {\n      return count;\n    }\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\nconsole.log(counter.getCount()); // 2"
  },
  {
    id: "js-4",
    category: "JavaScript",
    question: "What is hoisting?",
    answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation, before code execution.\n\n• Function declarations are fully hoisted (can be called before declaration)\n• var declarations are hoisted but not initialized (undefined until assignment)\n• let and const are hoisted but not initialized (Temporal Dead Zone)\n• Class declarations are NOT hoisted\n\nBest practice: Declare variables at the top of their scope to avoid confusion.",
    example: "// Function hoisting\ngreet(); // Works!\nfunction greet() {\n  console.log('Hello');\n}\n\n// var hoisting\nconsole.log(x); // undefined (not ReferenceError)\nvar x = 5;\n\n// let/const hoisting (Temporal Dead Zone)\nconsole.log(y); // ReferenceError\nlet y = 10;"
  },
  {
    id: "js-5",
    category: "JavaScript",
    question: "How does equality work in JS? What is the difference between using === and Object.is()?",
    answer: "JavaScript has multiple equality operators:\n\n• == (loose equality): Performs type coercion\n• === (strict equality): No type coercion, checks type and value\n• Object.is(): Similar to ===, but handles edge cases differently\n\nObject.is() differences:\n• Object.is(NaN, NaN) returns true (=== returns false)\n• Object.is(-0, +0) returns false (=== returns true)\n\nUse === for most cases, Object.is() for precise comparisons.",
    example: "// === vs Object.is()\nconsole.log(NaN === NaN); // false\nconsole.log(Object.is(NaN, NaN)); // true\n\nconsole.log(-0 === +0); // true\nconsole.log(Object.is(-0, +0)); // false\n\n// Loose vs strict\nconsole.log(5 == '5'); // true (coercion)\nconsole.log(5 === '5'); // false"
  },
  {
    id: "js-6",
    category: "JavaScript",
    question: "What is the purpose of Object.freeze()?",
    answer: "Object.freeze() makes an object immutable:\n\n• Prevents adding new properties\n• Prevents removing existing properties\n• Prevents changing existing property values\n• Prevents changing property descriptors\n\nNote: It's a shallow freeze - nested objects are not frozen unless you freeze them separately.",
    example: "const obj = { name: 'John', age: 30 };\nObject.freeze(obj);\n\nobj.age = 31; // Fails silently (throws in strict mode)\nobj.email = 'john@example.com'; // Fails\ndelete obj.name; // Fails\n\nconsole.log(obj); // { name: 'John', age: 30 }\n\n// Shallow freeze example\nconst user = Object.freeze({\n  name: 'John',\n  address: { city: 'NYC' }\n});\n\nuser.address.city = 'LA'; // Works! (nested object not frozen)"
  },
  {
    id: "js-7",
    category: "JavaScript",
    question: "What is the difference between async-await and promise chains?",
    answer: "Both handle asynchronous operations, but with different syntax:\n\nAsync/Await advantages:\n• Cleaner, more readable code (looks synchronous)\n• Easier error handling with try/catch\n• Better debugging experience\n• Avoids callback/promise hell\n\nPromise chains:\n• Can be more concise for simple operations\n• Better for parallel operations with Promise.all()\n\nAsync/await is generally preferred for readability and maintainability.",
    example: "// Promise chain\nfetchUser()\n  .then(user => fetchPosts(user.id))\n  .then(posts => console.log(posts))\n  .catch(error => console.error(error));\n\n// Async/await (cleaner)\nasync function loadUserPosts() {\n  try {\n    const user = await fetchUser();\n    const posts = await fetchPosts(user.id);\n    console.log(posts);\n  } catch (error) {\n    console.error(error);\n  }\n}"
  },
  {
    id: "js-8",
    category: "JavaScript",
    question: "How do generators work?",
    answer: "Generators are functions that can pause and resume execution:\n\n• Defined with function* syntax\n• Use yield keyword to pause and return values\n• Return an iterator object\n• Maintain state between pauses\n• Useful for lazy evaluation and infinite sequences\n\nGenerators are useful for:\n• Creating iterators\n• Lazy data generation\n• Handling async operations (before async/await)\n• Infinite sequences",
    example: "function* countUp() {\n  let count = 0;\n  while (true) {\n    yield count++;\n  }\n}\n\nconst counter = countUp();\nconsole.log(counter.next().value); // 0\nconsole.log(counter.next().value); // 1\n\n// Practical example\nfunction* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield i;\n  }\n}\n\nfor (const num of range(1, 5)) {\n  console.log(num); // 1, 2, 3, 4, 5\n}"
  },
  {
    id: "css-1",
    category: "CSS",
    question: "How does CSS-in-JS work?",
    answer: "CSS-in-JS is an approach where CSS is written directly in JavaScript:\n\n• Styles are defined as JavaScript objects or template literals\n• Scoped by default (no global namespace pollution)\n• Access to JavaScript variables and logic\n• Dynamic styling based on props/state\n• Automatic vendor prefixing\n\nPopular libraries: styled-components, Emotion, JSS\n\nTrade-offs:\n• Runtime cost (styles generated at runtime)\n• Increased bundle size\n• Better developer experience and component isolation",
    example: "// styled-components example\nimport styled from 'styled-components';\n\nconst Button = styled.button`\n  background: ${props => props.primary ? 'blue' : 'gray'};\n  color: white;\n  padding: 10px 20px;\n  border-radius: 4px;\n`;\n\n<Button primary>Click me</Button>"
  },
  {
    id: "css-2",
    category: "CSS",
    question: "What are container queries?",
    answer: "Container queries allow styling elements based on their container's size, not the viewport size:\n\n• More flexible than media queries\n• Enable true component-based responsive design\n• Components adapt to their container, not the screen\n• Require defining a containment context\n\nUse @container rule to query container dimensions.",
    example: ".card-container {\n  container-type: inline-size;\n  container-name: card;\n}\n\n.card {\n  display: grid;\n}\n\n@container card (min-width: 400px) {\n  .card {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n@container card (min-width: 600px) {\n  .card {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}"
  },
  {
    id: "css-3",
    category: "CSS",
    question: "How does CSS Grid subgrid work?",
    answer: "Subgrid allows nested grids to inherit parent grid tracks:\n\n• Child grid uses parent's row or column lines\n• Maintains alignment across nested levels\n• Simplifies complex layouts\n• Defined with 'grid-template-columns: subgrid' or 'grid-template-rows: subgrid'\n\nUseful for card layouts where nested content needs to align across multiple cards.",
    example: ".parent {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.child {\n  display: grid;\n  grid-template-rows: subgrid;\n  grid-row: span 3;\n}\n\n/* Now child inherits parent's row structure */\n.child-item {\n  /* Aligns with other children at same level */\n}"
  },
  {
    id: "react-1",
    category: "React",
    question: "What is the Virtual DOM? And why is it often more performant?",
    answer: "The Virtual DOM is an in-memory representation of the real DOM:\n\n• React creates a lightweight JavaScript object tree\n• When state changes, React creates a new Virtual DOM\n• React compares (diffs) the old and new Virtual DOM\n• Only the differences are applied to the real DOM (reconciliation)\n\nWhy it's performant:\n• Batches multiple updates together\n• Minimizes expensive real DOM operations\n• Updates only what changed, not the entire tree\n• JavaScript operations are faster than DOM manipulation",
    example: "// When you update state:\nsetCount(count + 1);\n\n// React doesn't immediately update DOM\n// Instead:\n// 1. Creates new Virtual DOM\n// 2. Diffs with previous Virtual DOM\n// 3. Calculates minimal changes\n// 4. Updates only changed elements in real DOM"
  },
  {
    id: "react-2",
    category: "React",
    question: "Why does useState hook accept a function as initial value?",
    answer: "useState accepts a function (lazy initialization) to avoid expensive computations on every render:\n\n• The function runs ONLY on the initial render\n• Useful when initial state requires heavy computation\n• The function should be pure and take no arguments\n\nWithout lazy initialization, the computation runs every render even though the result is ignored.",
    example: "// Bad: Runs on every render\nconst [data, setData] = useState(\n  expensiveComputation()\n);\n\n// Good: Runs only once\nconst [data, setData] = useState(() => {\n  return expensiveComputation();\n});\n\n// Example\nconst [items, setItems] = useState(() => {\n  const saved = localStorage.getItem('items');\n  return saved ? JSON.parse(saved) : [];\n});"
  },
  {
    id: "react-3",
    category: "React",
    question: "What is the difference between useState and useReducer?",
    answer: "Both manage state, but for different use cases:\n\nuseState:\n• Simple state updates\n• Single values or simple objects\n• Direct state updates\n\nuseReducer:\n• Complex state logic\n• Multiple sub-values or related state\n• State transitions based on actions\n• Easier to test (pure reducer function)\n• Better for state machines\n\nChoose useReducer when you have complex state logic or multiple related state updates.",
    example: "// useState - simple\nconst [count, setCount] = useState(0);\nsetCount(count + 1);\n\n// useReducer - complex\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    case 'reset':\n      return { count: 0 };\n    default:\n      return state;\n  }\n}\n\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\ndispatch({ type: 'increment' });"
  },
  {
    id: "react-4",
    category: "React",
    question: "Under what circumstances does a component re-render in React?",
    answer: "A React component re-renders when:\n\n1. State changes via setState or hook updater\n2. Props change (parent passes new props)\n3. Parent component re-renders (by default, all children re-render)\n4. Context value changes (for components using useContext)\n5. Force update (useReducer or forceUpdate - not recommended)\n\nImportant: Props are compared by reference, not deep equality. Same object reference = no re-render trigger.",
    example: "// Causes re-render\nconst [count, setCount] = useState(0);\nsetCount(1); // Re-renders\n\n// Parent re-render causes child re-render\nfunction Parent() {\n  const [state, setState] = useState(0);\n  return <Child />; // Child re-renders even if no props\n}\n\n// Prevent with React.memo\nconst Child = React.memo(function Child({ name }) {\n  return <div>{name}</div>;\n});"
  },
  {
    id: "react-5",
    category: "React",
    question: "How can we prevent unnecessary re-renders?",
    answer: "Strategies to prevent unnecessary re-renders:\n\n• React.memo: Memoize component (prevents re-render if props unchanged)\n• useMemo: Memoize expensive computations\n• useCallback: Memoize function references\n• Proper dependency arrays in hooks\n• Use useRef for values that don't need re-renders\n• Split components to isolate state changes\n• Use composition (children prop) to prevent re-renders\n• For forms, prefer useRef over useState for input values",
    example: "// React.memo\nconst ExpensiveComponent = React.memo(({ data }) => {\n  return <div>{data}</div>;\n});\n\n// useCallback\nconst Parent = () => {\n  const [count, setCount] = useState(0);\n  \n  // Without useCallback, new function every render\n  const handleClick = useCallback(() => {\n    console.log('clicked');\n  }, []);\n  \n  return <Child onClick={handleClick} />;\n};\n\n// useRef for form inputs\nconst inputRef = useRef();\nconst handleSubmit = () => {\n  console.log(inputRef.current.value);\n};"
  },
  {
    id: "react-6",
    category: "React",
    question: "What are the purposes of useRef, useMemo, and useCallback?",
    answer: "useRef:\n• Creates a mutable reference that persists across renders\n• Doesn't trigger re-renders when changed\n• Used for DOM element references or storing mutable values\n\nuseMemo:\n• Memoizes computed values\n• Recalculates only when dependencies change\n• Used for expensive calculations\n\nuseCallback:\n• Memoizes function references\n• Returns same function instance unless dependencies change\n• Used to prevent unnecessary child re-renders",
    example: "// useRef\nconst inputRef = useRef(null);\nuseEffect(() => {\n  inputRef.current.focus();\n}, []);\n<input ref={inputRef} />\n\n// useMemo\nconst expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);\n\n// useCallback\nconst memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);"
  },
  {
    id: "react-7",
    category: "React",
    question: "What is virtualization? And what is it for?",
    answer: "Virtualization (or windowing) is a technique for rendering large lists efficiently:\n\n• Only renders visible items (and a small buffer)\n• Recycles DOM elements as user scrolls\n• Dramatically reduces DOM nodes\n• Improves performance for lists with thousands of items\n\nPopular libraries: react-window, react-virtualized\n\nUse when:\n• Rendering 100+ items\n• Items have consistent or calculable heights\n• Performance issues with large lists",
    example: "import { FixedSizeList } from 'react-window';\n\nconst Row = ({ index, style }) => (\n  <div style={style}>Row {index}</div>\n);\n\nfunction VirtualList() {\n  return (\n    <FixedSizeList\n      height={600}\n      itemCount={10000}\n      itemSize={50}\n      width=\"100%\"\n    >\n      {Row}\n    </FixedSizeList>\n  );\n}"
  },
  {
    id: "react-8",
    category: "React",
    question: "How does the useEffect hook work?",
    answer: "useEffect runs side effects in functional components:\n\n• Runs after render (after DOM updates)\n• Takes a function (effect) and optional dependency array\n• Empty array []: runs once on mount\n• No array: runs after every render\n• With dependencies: runs when dependencies change\n• Return cleanup function for cleanup (runs before next effect and on unmount)\n\nCommon uses: data fetching, subscriptions, DOM manipulation, timers",
    example: "// Run once on mount\nuseEffect(() => {\n  fetchData();\n}, []);\n\n// Run when 'id' changes\nuseEffect(() => {\n  fetchUser(id);\n}, [id]);\n\n// With cleanup\nuseEffect(() => {\n  const timer = setInterval(() => {\n    console.log('tick');\n  }, 1000);\n  \n  return () => clearInterval(timer);\n}, []);"
  },
  {
    id: "react-9",
    category: "React",
    question: "How can we do event cleanup in useEffect?",
    answer: "Return a cleanup function from useEffect:\n\n• The cleanup function runs before the next effect\n• Runs when component unmounts\n• Essential for preventing memory leaks\n\nCleanup is needed for:\n• Event listeners\n• Timers/intervals\n• Subscriptions\n• Async operations\n• WebSocket connections",
    example: "useEffect(() => {\n  const handleResize = () => {\n    console.log(window.innerWidth);\n  };\n  \n  window.addEventListener('resize', handleResize);\n  \n  // Cleanup function\n  return () => {\n    window.removeEventListener('resize', handleResize);\n  };\n}, []);\n\n// Multiple cleanups\nuseEffect(() => {\n  const timer = setInterval(() => {}, 1000);\n  const listener = () => {};\n  window.addEventListener('scroll', listener);\n  \n  return () => {\n    clearInterval(timer);\n    window.removeEventListener('scroll', listener);\n  };\n}, []);"
  },
  {
    id: "react-10",
    category: "React",
    question: "What is the recommended way to consume external data in React?",
    answer: "Modern approaches for data fetching:\n\n1. useEffect + fetch/axios (basic)\n2. Data fetching libraries (recommended):\n   • TanStack Query (React Query) - caching, refetching\n   • SWR - stale-while-revalidate pattern\n   • Apollo Client - for GraphQL\n\n3. Framework solutions:\n   • Next.js Server Components\n   • Remix loaders\n   • tRPC for type-safe APIs\n\nLibraries handle: caching, deduplication, background refetching, error/loading states",
    example: "// Basic useEffect\nconst [data, setData] = useState(null);\n\nuseEffect(() => {\n  fetch('/api/users')\n    .then(res => res.json())\n    .then(setData);\n}, []);\n\n// React Query (recommended)\nimport { useQuery } from '@tanstack/react-query';\n\nfunction Users() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['users'],\n    queryFn: () => fetch('/api/users').then(r => r.json())\n  });\n  \n  if (isLoading) return <div>Loading...</div>;\n  return <div>{data.map(user => ...)}</div>;\n}"
  },
  {
    id: "react-11",
    category: "React",
    question: "What is the difference between server state and application state?",
    answer: "Server State:\n• Data from external sources (APIs, databases)\n• Can be outdated (cached)\n• Asynchronous\n• Shared across users\n• Not owned by client\n• Managed by: React Query, SWR, Apollo\n\nApplication State:\n• Client-only data\n• UI state, form inputs, local preferences\n• Synchronous\n• User-specific\n• Fully controlled by client\n• Managed by: useState, useReducer, Zustand, Redux",
    example: "// Server state\nconst { data: users } = useQuery({\n  queryKey: ['users'],\n  queryFn: fetchUsers\n});\n\n// Application state\nconst [isOpen, setIsOpen] = useState(false);\nconst [theme, setTheme] = useState('dark');\nconst [searchQuery, setSearchQuery] = useState('');"
  },
  {
    id: "next-1",
    category: "Next.js",
    question: "What is the difference between getServerSideProps and getStaticProps?",
    answer: "Both are data fetching methods in Next.js Pages Router:\n\ngetStaticProps:\n• Runs at BUILD time\n• Generates static HTML\n• Fast page loads (served from CDN)\n• Use for content that doesn't change often\n• Can use ISR (Incremental Static Regeneration)\n\ngetServerSideProps:\n• Runs at REQUEST time (on every request)\n• Server-side rendering\n• Always fresh data\n• Slower than static (server processing on each request)\n• Use for frequently changing data or personalized content",
    example: "// Static generation\nexport async function getStaticProps() {\n  const data = await fetch('/api/posts');\n  return {\n    props: { data },\n    revalidate: 60 // ISR: rebuild every 60s\n  };\n}\n\n// Server-side rendering\nexport async function getServerSideProps(context) {\n  const { id } = context.params;\n  const data = await fetch(`/api/user/${id}`);\n  return { props: { data } };\n}"
  },
  {
    id: "next-2",
    category: "Next.js",
    question: "What is the purpose of getStaticPaths?",
    answer: "getStaticPaths defines which dynamic routes to pre-render at build time:\n\n• Used WITH getStaticProps for dynamic routes\n• Returns list of paths to pre-generate\n• Required for dynamic routes using getStaticProps\n• Controls fallback behavior for paths not pre-generated\n\nfallback options:\n• false: 404 for paths not returned\n• true: generates pages on-demand\n• 'blocking': SSR for missing paths",
    example: "// pages/posts/[id].js\nexport async function getStaticPaths() {\n  const posts = await fetch('/api/posts');\n  \n  const paths = posts.map(post => ({\n    params: { id: post.id.toString() }\n  }));\n  \n  return {\n    paths,\n    fallback: 'blocking'\n  };\n}\n\nexport async function getStaticProps({ params }) {\n  const post = await fetch(`/api/posts/${params.id}`);\n  return { props: { post } };\n}"
  },
  {
    id: "next-3",
    category: "Next.js",
    question: "How does next/image work? Why does it improve performance?",
    answer: "next/image is an optimized image component:\n\nOptimizations:\n• Automatic image optimization (resize, format conversion)\n• Converts to modern formats (WebP, AVIF)\n• Lazy loading by default\n• Responsive images with srcset\n• Prevents Cumulative Layout Shift (CLS)\n• Serves optimized images from cache\n\nImages are optimized on-demand and cached for subsequent requests.",
    example: "import Image from 'next/image';\n\n<Image\n  src=\"/hero.jpg\"\n  alt=\"Hero image\"\n  width={800}\n  height={600}\n  priority // Disable lazy load for above-fold\n  placeholder=\"blur\" // Show blur while loading\n/>\n\n// External images\n<Image\n  src=\"https://example.com/image.jpg\"\n  alt=\"External\"\n  width={500}\n  height={300}\n/>"
  },
  {
    id: "next-4",
    category: "Next.js",
    question: "How would you deploy a Next.js app without Vercel?",
    answer: "Next.js can be deployed on any Node.js hosting:\n\n1. Build the app: npm run build\n2. Start the server: npm start\n3. Deploy to:\n   • AWS (EC2, Elastic Beanstalk, ECS)\n   • Google Cloud (App Engine, Cloud Run)\n   • DigitalOcean\n   • Heroku\n   • Railway\n   • Self-hosted VPS\n\nRequirements:\n• Node.js runtime\n• Process manager (PM2) for production\n• Reverse proxy (Nginx) recommended\n• Environment variables configured",
    example: "// package.json\n{\n  \"scripts\": {\n    \"build\": \"next build\",\n    \"start\": \"next start -p $PORT\"\n  }\n}\n\n// With PM2\npm2 start npm --name \"next-app\" -- start\n\n// Docker\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]"
  },
  {
    id: "next-5",
    category: "Next.js",
    question: "How do API routes work?",
    answer: "API Routes provide backend API endpoints in Next.js:\n\n• Create files in pages/api/ directory\n• Each file exports request handler\n• Runs server-side only (not bundled for client)\n• Access to req (request) and res (response) objects\n• Supports all HTTP methods\n• Can use middleware\n\nUseful for:\n• Backend logic without separate server\n• Proxying external APIs\n• Database operations\n• Authentication",
    example: "// pages/api/users.js\nexport default async function handler(req, res) {\n  if (req.method === 'GET') {\n    const users = await db.getUsers();\n    res.status(200).json(users);\n  } else if (req.method === 'POST') {\n    const newUser = await db.createUser(req.body);\n    res.status(201).json(newUser);\n  } else {\n    res.status(405).end(); // Method not allowed\n  }\n}\n\n// Call from client\nfetch('/api/users')\n  .then(r => r.json())\n  .then(data => console.log(data));"
  },
  {
    id: "next-6",
    category: "Next.js",
    question: "What is a meta-framework?",
    answer: "A meta-framework is built on top of a library/framework, adding features:\n\n• Provides opinionated structure\n• Adds routing, data fetching, and build tooling\n• Handles configuration and optimization\n• Enables features like SSR, SSG, API routes\n\nExamples:\n• Next.js → Built on React\n• Nuxt.js → Built on Vue\n• SvelteKit → Built on Svelte\n• Remix → Built on React\n• Astro → Framework-agnostic\n\nBenefits: Better DX, performance optimizations, production-ready features out of the box"
  },
  {
    id: "next-7",
    category: "Next.js",
    question: "What are Server Components in Next.js?",
    answer: "React Server Components (RSC) in Next.js 13+ App Router:\n\n• Run only on the server\n• Can directly access backend resources (databases, file system)\n• Zero JavaScript sent to client\n• Default in App Router\n• Can't use hooks or browser APIs\n• Better performance and smaller bundles\n\nClient Components:\n• Use 'use client' directive\n• Support hooks and interactivity\n• Sent to browser\n\nYou can mix both: Server Components can import Client Components.",
    example: "// Server Component (default in app/)\nasync function UserProfile({ id }) {\n  // Direct database access!\n  const user = await db.user.findUnique({ where: { id } });\n  \n  return <div>{user.name}</div>;\n}\n\n// Client Component\n'use client';\nimport { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
  },
  {
    id: "ts-1",
    category: "TypeScript",
    question: "What is the difference between type and interface in TypeScript?",
    answer: "Both define object shapes, but have key differences:\n\nInterface:\n• Can be extended and merged (declaration merging)\n• Better for object-oriented patterns\n• Supports extends keyword\n• Only describes object shapes\n\nType:\n• More flexible (unions, intersections, primitives, tuples)\n• Cannot be reopened to add properties\n• Uses & for combining types\n• Can alias any type\n\nUse interface for object shapes that might be extended, type for everything else (especially unions).",
    example: "// Interface - declaration merging\ninterface User {\n  name: string;\n}\ninterface User {\n  age: number;\n}\nconst user: User = { name: 'John', age: 30 }; // OK\n\n// Type - unions and intersections\ntype Status = 'pending' | 'success' | 'error';\ntype Admin = User & { role: 'admin' };\n\n// Interface extending\ninterface Employee extends User {\n  employeeId: string;\n}"
  },
  {
    id: "ts-2",
    category: "TypeScript",
    question: "What are generics in TypeScript? Why are they useful?",
    answer: "Generics allow creating reusable, type-safe components that work with multiple types:\n\n• Define placeholder types that get specified later\n• Maintain type safety without knowing exact types ahead of time\n• Enable code reuse without sacrificing type information\n• Commonly used in functions, classes, and interfaces\n\nBenefits:\n• Type safety with flexibility\n• Better IDE autocomplete\n• Catch errors at compile time\n• Self-documenting code",
    example: "// Generic function\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nconst num = identity<number>(42);\nconst str = identity<string>('hello');\n\n// Generic interface\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n}\n\nconst userResponse: ApiResponse<User> = {\n  data: { name: 'John', age: 30 },\n  status: 200\n};\n\n// Multiple type parameters\nfunction merge<T, U>(obj1: T, obj2: U): T & U {\n  return { ...obj1, ...obj2 };\n}"
  },
  {
    id: "ts-3",
    category: "TypeScript",
    question: "What are utility types in TypeScript? Name and explain some common ones.",
    answer: "Utility types are built-in generic types for common type transformations:\n\n• Partial<T>: Makes all properties optional\n• Required<T>: Makes all properties required\n• Readonly<T>: Makes all properties readonly\n• Pick<T, K>: Creates type with subset of properties\n• Omit<T, K>: Creates type excluding properties\n• Record<K, T>: Creates object type with specific keys\n• Exclude<T, U>: Excludes types from union\n• Extract<T, U>: Extracts types from union\n• NonNullable<T>: Excludes null/undefined\n• ReturnType<T>: Gets function return type",
    example: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  age: number;\n}\n\n// Partial - all optional\ntype PartialUser = Partial<User>;\nconst update: PartialUser = { name: 'Jane' };\n\n// Pick - select properties\ntype UserPreview = Pick<User, 'id' | 'name'>;\n\n// Omit - exclude properties\ntype UserWithoutId = Omit<User, 'id'>;\n\n// Record\ntype Roles = Record<'admin' | 'user' | 'guest', string[]>;\n\n// ReturnType\nfunction getUser() { return { name: 'John' }; }\ntype User = ReturnType<typeof getUser>;"
  },
  {
    id: "ts-4",
    category: "TypeScript",
    question: "What is the difference between any, unknown, and never types?",
    answer: "These are special types for different scenarios:\n\nany:\n• Disables type checking\n• Unsafe - avoid when possible\n• Can assign to/from any type\n\nunknown:\n• Type-safe alternative to any\n• Must narrow type before using\n• Can't perform operations without type checking\n\nnever:\n• Represents values that never occur\n• Used for functions that never return\n• Bottom type in type system\n• Useful for exhaustive checks",
    example: "// any - dangerous\nlet value: any = 'hello';\nvalue.foo.bar(); // No error, but runtime crash\n\n// unknown - safe\nlet value2: unknown = 'hello';\nif (typeof value2 === 'string') {\n  console.log(value2.toUpperCase()); // OK\n}\n\n// never - functions that don't return\nfunction throwError(): never {\n  throw new Error('Error!');\n}\n\n// Exhaustive check with never\ntype Shape = Circle | Square;\nfunction area(shape: Shape) {\n  switch (shape.kind) {\n    case 'circle': return Math.PI * shape.radius ** 2;\n    case 'square': return shape.size ** 2;\n    default:\n      const _exhaustive: never = shape; // Error if missing case\n  }\n}"
  },
  {
    id: "ts-5",
    category: "TypeScript",
    question: "What are conditional types? How do they work?",
    answer: "Conditional types select one of two types based on a condition:\n\n• Syntax: T extends U ? X : Y\n• Used for advanced type transformations\n• Enable type-level logic\n• Common with generics\n• Power built-in utility types\n\nUseful for:\n• Creating flexible type utilities\n• Type inference\n• Narrowing types based on conditions",
    example: "// Basic conditional type\ntype IsString<T> = T extends string ? true : false;\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false\n\n// Extract function return type\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\n// Exclude null/undefined\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\n// Real-world example\ntype ApiResponse<T> = T extends { id: number }\n  ? { data: T; status: 200 }\n  : { error: string; status: 400 };\n\ntype UserResponse = ApiResponse<{ id: 1; name: 'John' }>;\ntype ErrorResponse = ApiResponse<string>;"
  },
  {
    id: "perf-1",
    category: "Performance",
    question: "What is code splitting and how does it improve performance?",
    answer: "Code splitting divides your bundle into smaller chunks loaded on demand:\n\n• Reduces initial bundle size\n• Faster initial page load\n• Loads code only when needed\n• Improves Time to Interactive (TTI)\n\nTechniques:\n• Dynamic imports\n• Route-based splitting\n• Component-based splitting\n• Vendor/library splitting\n\nFrameworks like Next.js and Vite do this automatically, but you can also manually split with dynamic imports.",
    example: "// Dynamic import\nconst HeavyComponent = lazy(() => import('./HeavyComponent'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <HeavyComponent />\n    </Suspense>\n  );\n}\n\n// Route-based splitting\nconst routes = [\n  {\n    path: '/dashboard',\n    component: lazy(() => import('./Dashboard'))\n  },\n  {\n    path: '/profile',\n    component: lazy(() => import('./Profile'))\n  }\n];\n\n// Vanilla JS\nbutton.addEventListener('click', async () => {\n  const module = await import('./analytics.js');\n  module.trackEvent('button-click');\n});"
  },
  {
    id: "perf-2",
    category: "Performance",
    question: "What is tree shaking and how does it work?",
    answer: "Tree shaking eliminates unused code from bundles:\n\n• Static analysis of ES modules\n• Removes dead code during build\n• Reduces bundle size\n• Requires ES6 module syntax (import/export)\n• Works with production builds\n\nHow it works:\n• Build tools analyze import/export statements\n• Mark unused exports\n• Remove them during minification\n\nRequirements:\n• Use ES6 modules, not CommonJS\n• Side-effect-free code\n• Production build mode",
    example: "// math.js - ES6 modules\nexport function add(a, b) { return a + b; }\nexport function subtract(a, b) { return a - b; }\nexport function multiply(a, b) { return a * b; }\n\n// app.js - only imports add\nimport { add } from './math.js';\nconsole.log(add(2, 3));\n\n// Result: subtract and multiply are removed from bundle\n\n// package.json - mark side effects\n{\n  \"sideEffects\": false,\n  // or specify files with side effects\n  \"sideEffects\": [\"*.css\"]\n}"
  },
  {
    id: "perf-3",
    category: "Performance",
    question: "What is memoization and when should you use it?",
    answer: "Memoization caches function results based on inputs:\n\n• Stores expensive computation results\n• Returns cached result for same inputs\n• Trades memory for speed\n• Most effective for pure functions\n• Useful for recursive algorithms\n\nIn React:\n• useMemo for values\n• useCallback for functions\n• React.memo for components\n\nUse when:\n• Expensive computations\n• Referential equality matters\n• Preventing child re-renders",
    example: "// Pure function memoization\nconst memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};\n\nconst fibonacci = memoize((n) => {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n});\n\n// React useMemo\nconst expensiveValue = useMemo(() => {\n  return items.filter(item => item.active)\n    .map(item => item.value)\n    .reduce((a, b) => a + b, 0);\n}, [items]);"
  },
  {
    id: "perf-4",
    category: "Performance",
    question: "What is debouncing and throttling? When would you use each?",
    answer: "Both limit function execution frequency, but differently:\n\nDebouncing:\n• Delays execution until after inactivity\n• Waits for event storm to end\n• Executes once after delay\n• Use for: search inputs, window resize, form validation\n\nThrottling:\n• Limits execution to once per time interval\n• Guarantees execution at regular intervals\n• Use for: scroll events, mouse movement, API rate limiting\n\nKey difference: Debounce waits for calm, throttle maintains rhythm.",
    example: "// Debounce - wait for user to stop typing\nfunction debounce(fn, delay) {\n  let timeoutId;\n  return (...args) => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst searchAPI = debounce((query) => {\n  fetch(`/api/search?q=${query}`);\n}, 300);\n\ninput.addEventListener('input', (e) => searchAPI(e.target.value));\n\n// Throttle - limit scroll handler\nfunction throttle(fn, limit) {\n  let inThrottle;\n  return (...args) => {\n    if (!inThrottle) {\n      fn(...args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n\nconst handleScroll = throttle(() => {\n  console.log('Scrolled!');\n}, 200);\n\nwindow.addEventListener('scroll', handleScroll);"
  },
  {
    id: "test-1",
    category: "Testing",
    question: "What is the difference between unit tests, integration tests, and end-to-end tests?",
    answer: "Testing pyramid represents different test levels:\n\nUnit Tests:\n• Test individual functions/components in isolation\n• Fast, many tests\n• Mock dependencies\n• Catch bugs early\n• Tools: Jest, Vitest\n\nIntegration Tests:\n• Test how components work together\n• Test component interactions\n• Some mocking, but less than unit tests\n• Tools: React Testing Library\n\nEnd-to-End (E2E) Tests:\n• Test complete user flows\n• Test in real browser\n• No mocking\n• Slow, fewer tests\n• Tools: Playwright, Cypress\n\nPyramid: Many unit tests, some integration, few E2E.",
    example: "// Unit test - isolated\nimport { sum } from './math';\n\ntest('sum adds numbers', () => {\n  expect(sum(2, 3)).toBe(5);\n});\n\n// Integration test - components together\nimport { render, screen } from '@testing-library/react';\n\ntest('login form submits data', async () => {\n  render(<LoginForm />);\n  fireEvent.change(screen.getByLabelText('Email'), {\n    target: { value: 'test@example.com' }\n  });\n  fireEvent.click(screen.getByText('Submit'));\n  expect(await screen.findByText('Success')).toBeInTheDocument();\n});\n\n// E2E test - full flow\ntest('user can complete checkout', async ({ page }) => {\n  await page.goto('/products');\n  await page.click('text=Add to Cart');\n  await page.click('text=Checkout');\n  await page.fill('#email', 'user@example.com');\n  await page.click('text=Complete Order');\n  await expect(page.locator('text=Order confirmed')).toBeVisible();\n});"
  },
  {
    id: "test-2",
    category: "Testing",
    question: "What is test-driven development (TDD)? What are its benefits?",
    answer: "TDD is a development approach where tests are written before code:\n\nProcess (Red-Green-Refactor):\n1. Write failing test (Red)\n2. Write minimal code to pass (Green)\n3. Refactor while keeping tests green\n\nBenefits:\n• Better design (testable = modular)\n• Fewer bugs\n• Living documentation\n• Confidence when refactoring\n• Prevents over-engineering\n\nChallenges:\n• Slower initial development\n• Requires discipline\n• Learning curve",
    example: "// 1. RED - Write failing test\ntest('calculateTotal adds item prices', () => {\n  const items = [\n    { price: 10 },\n    { price: 20 },\n    { price: 30 }\n  ];\n  expect(calculateTotal(items)).toBe(60);\n});\n\n// Test fails - calculateTotal doesn't exist\n\n// 2. GREEN - Minimal code to pass\nfunction calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}\n\n// Test passes!\n\n// 3. REFACTOR - Improve code\nfunction calculateTotal(items) {\n  if (!Array.isArray(items)) return 0;\n  return items.reduce((sum, item) => sum + (item?.price || 0), 0);\n}\n\n// Tests still pass"
  },
  {
    id: "test-3",
    category: "Testing",
    question: "How do you test asynchronous code in JavaScript?",
    answer: "Multiple approaches for testing async code:\n\n1. async/await (preferred):\n• Clean, readable syntax\n• Works like synchronous code\n\n2. Promises with return:\n• Return promise from test\n• Test waits for resolution\n\n3. done callback (older approach):\n• Call done() when complete\n• Call done(error) on failure\n\n4. Testing Library utilities:\n• waitFor, findBy queries\n• Automatically retry assertions",
    example: "// async/await (best)\ntest('fetches user data', async () => {\n  const user = await fetchUser(1);\n  expect(user.name).toBe('John');\n});\n\n// Testing Library - findBy waits\ntest('shows user after load', async () => {\n  render(<UserProfile id={1} />);\n  const name = await screen.findByText('John');\n  expect(name).toBeInTheDocument();\n});\n\n// waitFor - polling until condition met\ntest('updates after API call', async () => {\n  render(<Counter />);\n  fireEvent.click(screen.getByText('Increment'));\n  await waitFor(() => {\n    expect(screen.getByText('Count: 1')).toBeInTheDocument();\n  });\n});\n\n// Mock async functions\nconst mockFetch = jest.fn().mockResolvedValue({\n  json: async () => ({ name: 'John' })\n});"
  },
  {
    id: "web-1",
    category: "Web APIs",
    question: "What is the Intersection Observer API? What is it used for?",
    answer: "Intersection Observer detects when elements enter/exit viewport:\n\n• Asynchronous observation of element visibility\n• More efficient than scroll listeners\n• No layout thrashing\n• Configurable thresholds and root margins\n\nUse cases:\n• Lazy loading images\n• Infinite scroll\n• Analytics (track visibility)\n• Animations on scroll\n• Ad viewability tracking",
    example: "const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      // Element is visible\n      entry.target.classList.add('visible');\n      // Lazy load image\n      if (entry.target.dataset.src) {\n        entry.target.src = entry.target.dataset.src;\n        observer.unobserve(entry.target);\n      }\n    }\n  });\n}, {\n  threshold: 0.5, // 50% visible\n  rootMargin: '50px' // Trigger 50px before entering\n});\n\n// Observe elements\nconst images = document.querySelectorAll('img[data-src]');\nimages.forEach(img => observer.observe(img));\n\n// React hook\nfunction useInView(ref) {\n  const [isInView, setIsInView] = useState(false);\n  useEffect(() => {\n    const observer = new IntersectionObserver(([entry]) => {\n      setIsInView(entry.isIntersecting);\n    });\n    if (ref.current) observer.observe(ref.current);\n    return () => observer.disconnect();\n  }, [ref]);\n  return isInView;\n}"
  },
  {
    id: "web-2",
    category: "Web APIs",
    question: "What is the Web Storage API? What's the difference between localStorage and sessionStorage?",
    answer: "Web Storage provides client-side key-value storage:\n\nlocalStorage:\n• Persists until explicitly cleared\n• Survives browser close/reopen\n• Shared across tabs/windows (same origin)\n• ~5-10MB limit\n\nsessionStorage:\n• Clears when tab/window closes\n• Isolated per tab/window\n• ~5-10MB limit\n\nBoth:\n• Synchronous API\n• String values only (use JSON for objects)\n• Same-origin policy\n• Not secure (don't store sensitive data)",
    example: "// localStorage - persists\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\nlocalStorage.removeItem('theme');\nlocalStorage.clear();\n\n// Store objects (JSON)\nconst user = { name: 'John', age: 30 };\nlocalStorage.setItem('user', JSON.stringify(user));\nconst savedUser = JSON.parse(localStorage.getItem('user'));\n\n// sessionStorage - tab-specific\nsessionStorage.setItem('tempData', 'value');\n\n// Listen for storage changes (other tabs)\nwindow.addEventListener('storage', (e) => {\n  console.log('Key changed:', e.key);\n  console.log('Old value:', e.oldValue);\n  console.log('New value:', e.newValue);\n});\n\n// React hook\nfunction useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initial;\n  });\n  \n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  \n  return [value, setValue];\n}"
  },
  {
    id: "web-3",
    category: "Web APIs",
    question: "What is the Fetch API? How is it different from XMLHttpRequest?",
    answer: "Fetch is a modern API for HTTP requests:\n\nFetch advantages over XMLHttpRequest:\n• Promise-based (cleaner async code)\n• Simpler, more intuitive API\n• Better error handling\n• Built-in JSON parsing\n• Request/Response objects\n• Works with Service Workers\n\nCaveats:\n• Doesn't reject on HTTP errors (404, 500)\n• No built-in timeout\n• No upload progress (use XMLHttpRequest for that)\n• Cookies not sent by default (need credentials option)",
    example: "// Basic GET\nconst response = await fetch('/api/users');\nconst data = await response.json();\n\n// POST with JSON\nconst response = await fetch('/api/users', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({ name: 'John' })\n});\n\n// Error handling\ntry {\n  const response = await fetch('/api/data');\n  if (!response.ok) {\n    throw new Error(`HTTP error! status: ${response.status}`);\n  }\n  const data = await response.json();\n} catch (error) {\n  console.error('Fetch failed:', error);\n}\n\n// With credentials (cookies)\nfetch('/api/auth', {\n  credentials: 'include'\n});\n\n// Abort request\nconst controller = new AbortController();\nfetch('/api/data', { signal: controller.signal });\ncontroller.abort(); // Cancel request"
  },
  {
    id: "web-4",
    category: "Web APIs",
    question: "What are Web Workers? When should you use them?",
    answer: "Web Workers run JavaScript in background threads:\n\n• Separate from main thread (doesn't block UI)\n• No access to DOM\n• Message-based communication\n• Each worker has own global scope\n• Can import scripts\n\nUse cases:\n• Heavy computations (image processing, data parsing)\n• Large data transformations\n• Real-time data processing\n• Cryptography\n• Large JSON parsing\n\nAvoid for:\n• Simple tasks (overhead not worth it)\n• DOM manipulation\n• Frequent main thread communication",
    example: "// main.js - Create worker\nconst worker = new Worker('worker.js');\n\n// Send data to worker\nworker.postMessage({ numbers: [1, 2, 3, 4, 5] });\n\n// Receive result from worker\nworker.addEventListener('message', (e) => {\n  console.log('Result:', e.data);\n});\n\nworker.addEventListener('error', (e) => {\n  console.error('Worker error:', e.message);\n});\n\n// worker.js - Worker code\nself.addEventListener('message', (e) => {\n  const { numbers } = e.data;\n  \n  // Heavy computation\n  const sum = numbers.reduce((a, b) => a + b, 0);\n  \n  // Send result back\n  self.postMessage(sum);\n});\n\n// Terminate worker\nworker.terminate();"
  },
  {
    id: "js-9",
    category: "JavaScript",
    question: "What is event delegation? Why is it useful?",
    answer: "Event delegation attaches a single event listener to a parent element instead of multiple listeners on children:\n\n• Uses event bubbling\n• More memory efficient\n• Works with dynamic elements\n• Simpler management\n• Better performance for many elements\n\nHow it works:\n• Event bubbles up from target to ancestors\n• Parent listener catches events from children\n• Check event.target to identify source",
    example: "// Without delegation - inefficient\nconst buttons = document.querySelectorAll('.button');\nbuttons.forEach(button => {\n  button.addEventListener('click', handleClick);\n});\n\n// With delegation - efficient\ndocument.getElementById('container').addEventListener('click', (e) => {\n  if (e.target.matches('.button')) {\n    handleClick(e);\n  }\n});\n\n// Works with dynamic elements\nconst list = document.getElementById('todo-list');\nlist.addEventListener('click', (e) => {\n  if (e.target.matches('.delete-btn')) {\n    e.target.closest('li').remove();\n  }\n});\n\n// Even if new items are added later, listener still works\nlist.innerHTML += '<li>New item <button class=\"delete-btn\">×</button></li>';"
  },
  {
    id: "js-10",
    category: "JavaScript",
    question: "What is the event loop? How does it work?",
    answer: "The event loop manages asynchronous JavaScript execution:\n\nComponents:\n• Call Stack: Executes synchronous code\n• Web APIs: Handle async operations (timers, fetch)\n• Callback Queue (Task Queue): Holds callbacks from Web APIs\n• Microtask Queue: Holds promises, mutations\n• Event Loop: Moves tasks from queues to call stack\n\nExecution order:\n1. Execute synchronous code\n2. Execute all microtasks (promises)\n3. Execute one macrotask (setTimeout, events)\n4. Repeat\n\nMicrotasks have priority over macrotasks.",
    example: "console.log('1');\n\nsetTimeout(() => {\n  console.log('2');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3');\n});\n\nconsole.log('4');\n\n// Output: 1, 4, 3, 2\n// Explanation:\n// 1, 4 - synchronous\n// 3 - microtask (promise)\n// 2 - macrotask (setTimeout)\n\n// More complex example\nsetTimeout(() => console.log('timeout 1'), 0);\n\nPromise.resolve()\n  .then(() => console.log('promise 1'))\n  .then(() => console.log('promise 2'));\n\nsetTimeout(() => console.log('timeout 2'), 0);\n\nconsole.log('sync');\n\n// Output: sync, promise 1, promise 2, timeout 1, timeout 2"
  },
  {
    id: "react-12",
    category: "React",
    question: "What is prop drilling? How can you avoid it?",
    answer: "Prop drilling is passing props through multiple component levels to reach a deeply nested component:\n\nProblems:\n• Verbose and repetitive\n• Hard to maintain\n• Couples components unnecessarily\n• Makes refactoring difficult\n\nSolutions:\n1. Context API: Share data without passing props\n2. Component composition: Pass components as children\n3. State management: Redux, Zustand, Jotai\n4. Custom hooks: Encapsulate logic\n5. Render props: Pass functions as children",
    example: "// Problem - prop drilling\nfunction App() {\n  const [user, setUser] = useState(null);\n  return <Layout user={user} />;\n}\n\nfunction Layout({ user }) {\n  return <Sidebar user={user} />;\n}\n\nfunction Sidebar({ user }) {\n  return <UserMenu user={user} />;\n}\n\n// Solution 1: Context\nconst UserContext = createContext();\n\nfunction App() {\n  const [user, setUser] = useState(null);\n  return (\n    <UserContext.Provider value={user}>\n      <Layout />\n    </UserContext.Provider>\n  );\n}\n\nfunction UserMenu() {\n  const user = useContext(UserContext);\n  return <div>{user?.name}</div>;\n}\n\n// Solution 2: Composition\nfunction App() {\n  const [user, setUser] = useState(null);\n  return <Layout sidebar={<UserMenu user={user} />} />;\n}"
  },
  {
    id: "react-13",
    category: "React",
    question: "What are controlled vs uncontrolled components?",
    answer: "Form inputs can be controlled by React or the DOM:\n\nControlled:\n• React state controls input value\n• onChange updates state\n• Single source of truth (React state)\n• More control, validation, formatting\n• Slightly more code\n\nUncontrolled:\n• DOM controls input value\n• Use refs to access values\n• Less code for simple forms\n• Direct DOM manipulation\n• Default values with defaultValue\n\nUse controlled for: validation, formatting, dynamic behavior\nUse uncontrolled for: simple forms, file inputs, third-party integration",
    example: "// Controlled component\nfunction ControlledForm() {\n  const [name, setName] = useState('');\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log('Name:', name);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        value={name}\n        onChange={(e) => setName(e.target.value)}\n      />\n    </form>\n  );\n}\n\n// Uncontrolled component\nfunction UncontrolledForm() {\n  const nameRef = useRef();\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log('Name:', nameRef.current.value);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input ref={nameRef} defaultValue=\"John\" />\n    </form>\n  );\n}"
  },
  {
    id: "css-4",
    category: "CSS",
    question: "What is the CSS Box Model? How does box-sizing work?",
    answer: "The box model defines how element dimensions are calculated:\n\nComponents (outside to inside):\n• Margin: Space outside border\n• Border: Border around padding\n• Padding: Space inside border\n• Content: Actual content\n\nbox-sizing property:\n• content-box (default): width/height = content only\n• border-box: width/height = content + padding + border\n\nborder-box is preferred (easier to reason about sizing).",
    example: "/* Default - content-box */\n.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n  /* Total width: 200 + 40 + 10 = 250px */\n}\n\n/* border-box - recommended */\n.box {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n  /* Total width: 200px (includes padding and border) */\n}\n\n/* Global reset - common practice */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Visual example */\n.card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #ccc;\n  margin: 10px;\n  box-sizing: border-box;\n}"
  },
  {
    id: "css-5",
    category: "CSS",
    question: "What is the difference between position: absolute, relative, fixed, and sticky?",
    answer: "Position property controls element positioning:\n\nstatic (default):\n• Normal document flow\n• top/right/bottom/left have no effect\n\nrelative:\n• Positioned relative to normal position\n• Offset from where it would normally be\n• Takes up original space\n• Creates positioning context for children\n\nabsolute:\n• Removed from document flow\n• Positioned relative to nearest positioned ancestor\n• Doesn't take up space\n\nfixed:\n• Positioned relative to viewport\n• Stays in place when scrolling\n• Removed from flow\n\nsticky:\n• Hybrid of relative and fixed\n• Switches when scroll threshold reached",
    example: "/* relative - creates context */\n.container {\n  position: relative;\n}\n\n/* absolute - positioned within container */\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n/* fixed - stays in viewport */\n.header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n}\n\n/* sticky - scrolls then sticks */\n.table-header {\n  position: sticky;\n  top: 0;\n  background: white;\n  z-index: 10;\n}\n\n/* Common pattern: centered modal */\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}"
  },
  {
    id: "gf-5",
    category: "General Frontend",
    question: "What is CORS? How does it work?",
    answer: "CORS (Cross-Origin Resource Sharing) is a security mechanism that controls cross-origin HTTP requests:\n\n• Browsers block cross-origin requests by default (Same-Origin Policy)\n• CORS allows servers to specify which origins can access resources\n• Uses HTTP headers to communicate permissions\n• Preflight requests (OPTIONS) check permissions before actual request\n\nHeaders:\n• Access-Control-Allow-Origin: Allowed origins\n• Access-Control-Allow-Methods: Allowed HTTP methods\n• Access-Control-Allow-Headers: Allowed request headers\n• Access-Control-Allow-Credentials: Allow cookies\n\nPreflight triggered by: custom headers, methods other than GET/POST, certain content types",
    example: "// Server response headers (Node.js/Express)\napp.use((req, res, next) => {\n  res.header('Access-Control-Allow-Origin', 'https://example.com');\n  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\n  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');\n  res.header('Access-Control-Allow-Credentials', 'true');\n  \n  // Handle preflight\n  if (req.method === 'OPTIONS') {\n    return res.sendStatus(200);\n  }\n  next();\n});\n\n// Client - fetch with credentials\nfetch('https://api.example.com/data', {\n  method: 'POST',\n  credentials: 'include', // Send cookies\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ data: 'value' })\n});\n\n// CORS error: Server must send proper headers\n// Solutions: Configure server, use proxy, or JSONP (legacy)"
  }
];
