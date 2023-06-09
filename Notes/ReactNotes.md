# React 
React combines Java Script and HTML into its component format. CSS must be declared outside of the JSX file.    
JSX- Javascript and html together. 
## Render Function 
One of the primary purposes of a component is to generate user interface. This is done with the components render function. Whatever is returned from the render function is inserted into the component HTML element.

As a simple example, a JSX file containing a React component element named Demo would cause React to load the Demo component, call the render function, and insert the result into the place of the Demo element.

```
<div>
  Component: <Demo />
</div>
```
## React component
```
function Demo() {
  const who = 'world';
  return <b>Hello {who}</b>;
}
```
Result: 
```
<div>Component: <b>Hello world</b></p>
```
 ## Properties 
 React components also allow you to pass information to them in the form of element properties. The component receives the properties in its constructor and then can display them when it renders.

 ```
 JSX 
 <div>Component: <Demo who="Walke" /><div>
 React component 
 function Demo(props) {
  return <b>Hello {props.who}</b>;
}
Result HTML 
<div>Component: <b>Hello Walke</b></div>
```

## State 
In addition to properties, a component can have internal state. Component state is created by calling the React.useState hook function. The useState function returns a variable that contains the current state and a function to update the state. The following example creates a state variable called clicked and toggles the click state in the updateClicked function that gets called when the paragraph text is clicked.

```
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```
## Class style components 
In addition to the preferred function style components demonstrated above, React also supports class style components. However, you should note that the React team is moving away from the class style representation, and for that reason you should probably not use it. With that said, you are likely to see class style components and so you should be aware of the syntax. Below is the equivalent class style component for the Clicker component that we created above.

The major difference is that properties are loaded on the constructor and state is set using a setState function on the component object.

```
class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  onClicked() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  render() {
    return <p onClick={(e) => this.onClicked(e)}>clicked: {`${this.state.clicked}`}</p>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```
## Toolchain
As web programming becomes more and more complex it became necessary to abstract away some of that complexity with a series of tools. Some common functional pieces in a web application tool chain include:   

Code repository - Stores code in a shared, versioned, location.   
Linter - Removes, or warns, of non-idiomatic code usage.   
Prettier - Formats code according to a shared standard.   
Transpiler - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.   
Polyfill - Generates backward compatible code for supporting old browser versions that do not support the latest standards.   
Bundler - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).  
Minifier - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.  
Testing - Automated tests at multiple levels to ensure correctness.   
Deployment - Automated packaging and delivery of code from the development environment to the production environment.   
The toolchain that we use for our React project consists of GitHub as the code repository, Vite for JSX, TS, development and debugging support, ESBuild for converting to ES6 modules and transpiling (with Babel underneath), Rollup for bundling and tree shaking, PostCSS for CSS transpiling, and finally a simple bash script (deployReact.sh) for deployment.   
    
You don't have to fully understand what each of these pieces in the chain are accomplishing, but the more you know about them the more you can optimize your development efforts.    
    
In the following instruction we will show you how to use Vite to create a simple web application using the tools mentioned above. We will then demonstrate how to convert your startup into a modern web application by converting Simon to use Vite and React.     


## Vite 
For our toolchain we are going to use Vite. Vite bundles your code quickly, has great debugging support, and allows you to easily support JSX, TypeScript, and different CSS flavors.   
<img src="notesImages/viteTable.png"  alt="viteTable">