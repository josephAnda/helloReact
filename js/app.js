
var ContactItem = React.createClass({
	// Note that propTypes is a debugging tool and that the code functions without it
	propTypes: {
		name: React.PropTypes.string.isRequired,
		email: React.PropTypes.string.isRequired,
		description: React.PropTypes.string,
	},

	render: function() {
	// Note from James:  I wrap mult-line return statements in parentheses to avoid the
    // inevitable bugs caused by forgetting that JavaScript will throw away
    // the final lines when possible. The parentheses are not strictly
    // necessary.
		return (
			React.createElement('li', {},
				React.createElement('h2', {}, this.props.name),
				React.createElement('a', {href: 'mailto:'+ this.props.email}, this.props.email),
				React.createElement('div', {}, this.props.description)
			)
		)
	},
});

var ContactForm = React.createClass({

	propTypes: {
		contact: React.PropTypes.object.isRequired
	},

	render: function() {

		return (
			React.createElement('form', {},
				React.createElement('input', {
					type: 'text', 
					placeholder: 'Name (required)',
					value: this.props.contact.name
				}),
				React.createElement('input', {
					type: 'text', 
					placeholder: 'Email (required)',
					value: this.props.contact.email
				}),
				React.createElement('textarea', {
					placeholder: 'Description',
					value: this.props.contact.description
				}),
				React.createElement('button', {type: 'submit'}, "Add content" )
			)

		)
	},

});

var contacts = [
	{
		key: 1, 
		name: "James K Nelson", 
		email: "james@jamesknelson.com",
	},
	{
		key: 2,
		name: "Jim",
		email: "jim@example.com",
	},
	{
		key: 3,
		name: "Joe"
	}
];

var newContact = {
	name: "",
	email: "",
	description: ""
};

var listElements = contacts.filter( function(contact) {
	return contact.email }).map( function(contact) {
		return React.createElement(ContactItem, contact);
})

//  Below is where the render magic happens.  Note that React.createElement needs to be passed an object or a 
//  reference to an object that contains the required props in a key-value pair combination.  For example,
//  creating an element of the class 'ContactForm' requires an object with a value for the contact attribute 
//  to be passed to it. 
var rootElement = 
	React.createElement('div', {},
		React.createElement('h1', {}, "Contacts"),
		React.createElement('ul', {}, listElements),
		React.createElement(ContactForm, {contact: newContact})
	);


	


ReactDOM.render(rootElement, document.getElementById('react-app'));
//ReactDOM.render(form, document.getElementById('react-app'));