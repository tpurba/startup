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
