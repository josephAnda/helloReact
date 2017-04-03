
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

	//  Note that like the DOM, React uses the className property to assign CSS classes (as class is a reserved word in JavaScript).
			React.createElement('li', {className: 'ContactItem'},
				React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
				React.createElement('a', {className: 'ContactItem-email', href: 'mailto:'+ this.props.email}, this.props.email),
				React.createElement('div', {className: 'ContactItem-description'}, this.props.description)
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
			React.createElement('form', {className: 'ContactForm'},
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

var ContactView = React.createClass({
	propTypes: {
		contacts: React.PropTypes.array.isRequired,
		newContact: React.PropTypes.object.isRequired
	},

	render: function() {

		var contactItemElements = this.props.contacts.filter( function(contact) {
			return contact.email }).map( function(contact) {
				return React.createElement(ContactItem, contact);
			})

		return (
			React.createElement('div', {className:"ContactView"},
				React.createElement('h1', {className:"ContactView-heading"}, "Contacts"),
				React.createElement('ul', {className:"ContactView-list"}, contactItemElements),
				React.createElement(ContactForm, {contact: this.props.newContact})
			)
		)
	}
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


//  Below is where the render magic happens.  Note that React.createElement needs to be passed an object or a 
//  reference to an object that contains the required props in a key-value pair combination.  For example,
//  creating an element of the class 'ContactForm' requires an object with a value for the contact attribute 
//  to be passed to it. 

//  The implementation below has been modified to handle the task of adding classnames to the initial root element
ReactDOM.render(
	React.createElement(ContactView, {
		contacts: contacts,
		newContact: newContact
	}), 
	document.getElementById('react-app')
);
//ReactDOM.render(form, document.getElementById('react-app'));