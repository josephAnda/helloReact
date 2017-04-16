//  [  ]  Potential bug:  state.contacts, upon initialization, has a last undefined entry in the array
//  [!!]  Add red border to input elements that are erroneous 
//  [!!]  Remove border if problematic input is dealt with 
//  [  ]  Refactor so that you add a className prop instead of alter the DOM

var ContactItem = React.createClass({
	// Note that propTypes is a debugging tool and that the code functions without it
	propTypes: {
		name: React.PropTypes.string.isRequired,
		email: React.PropTypes.string.isRequired,
		description: React.PropTypes.string,
	},

	render: function() {
	// Return statement is wrapped in parentheses to ensure every statement is executed 
		return (

	//  Note that like the DOM, React uses the className property to assign CSS classes 
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
		value: React.PropTypes.object.isRequired,  //  Associated with a ContactItem object
		onChange: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired, 
	},

	render: function() {

		var oldContact = this.props.value;  //  Here we're trying to track the original contact passed into the form
		var onChange = this.props.onChange;
		var onSubmit = this.props.onSubmit;

		//  Take note of the onChange function and how it references user input
		return (
			React.createElement('form', {
				className: 'ContactForm',
				onSubmit: function(e) { 
					e.preventDefault();  //  This line keeps every onChange event from triggering a submit
					onSubmit(oldContact, e.target.childNodes); 
				},
			},
				React.createElement('input', {
					type: 'text', 
					placeholder: 'Name (required)',
					value: this.props.value.name,
					onChange: function(e) {
						onChange(Object.assign({}, oldContact, {name: e.target.value})); 
					}, 
					id: 'nameInput',
				}),
				React.createElement('input', {
					type: 'text', 
					placeholder: 'Email (required)',
					value: this.props.value.email,
					onChange: function(e) {
						onChange(Object.assign({}, oldContact, {email: e.target.value}));
					},
					id: 'emailInput',
				}),
				React.createElement('textarea', {
					placeholder: 'Description (optional)',
					value: this.props.value.description,
					onChange: function(e) {
						onChange(Object.assign({}, oldContact, {description: e.target.value}));
					},
				}),
				React.createElement('button', {type: 'submit'}, "Add content" )
			)

		)
	},

});

var ContactView = React.createClass({
	propTypes: {
		contacts: React.PropTypes.array.isRequired,
		newContact: React.PropTypes.object.isRequired,
		onContactChange: React.PropTypes.func.isRequired,
		onFormSubmit: React.PropTypes.func.isRequired
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
				React.createElement(ContactForm, {
					value: this.props.newContact,
					onChange: this.props.onContactChange,
					onSubmit: this.props.onFormSubmit  //  The following is a test line to probe functionality
				})
			)
		)
	}
});

//  Below is the path by which React communicates its state from lower-level components to higher level components.  Object.assign()
//  Is heavily relied upon to return objects with modified properties that reflect changes to the interface.  These changes need to 
//  be communicated in this way to preserve the immutability of the components.  In short, the necessary changes are communicated through
//  props

var state = {};

var setState = function(changes) {
	Object.assign(state, changes);  //  This line should assign properties specified in a 'changes' object to the 'state' object

	ReactDOM.render(
		React.createElement(ContactView, 
			Object.assign( {}, state, {
				onContactChange: updateView,
				onFormSubmit: submitNewContact,
			})),
		document.getElementById('react-app')
	);
		
};

//  Function that re-renders DOM using setState when changes are detected in the UI
var updateView = function(contact) {
	setState({newContact: contact});
};


var submitNewContact = function(contact, inputs) {
	
	//  Access name and email inputs from page 
	var textInputs = Array.from(inputs).filter( function(input) {
				return (input.tagName == 'INPUT');
			});
	
	//  Prepare new contact object to be passed to ReactDOM
	var updatedContact = Object.assign( {}, contact, {
		key: keyTracker++,
		errors: {},
	});  

	//  RegEx to check for an email formatting error
	//  [  ]  Move the following check to the inside of the error checking subroutine that follows it
	if (!/.+@.+\..+/.test(contact.email)) {
			updatedContact.errors.email = ["Please enter your new contact's email"];
			var emailInput = Array.from(inputs).filter( function(input) {
			return input.id == 'emailInput';
		})[0];
	}

	//  Error checking subroutine for the text inputs (they can't be blank)
	var textInputs = textInputs.map( function(input) {
		if (!input.value && input.className != 'error') { 
			input.className += 'error' 
		} else if (input.value) {
			input.className = '';  // <-- This line breaks the page if the textInputs have any className values besides 'error'
		}
		return input;
	});
	
	//  Update the contact list if the minimum inputs aren't blank 
	if (contact.name && contact.email) { 
		
		var updatedContacts = state.contacts;
		updatedContacts.push(updatedContact);
		setState({
			contacts: updatedContacts,
			newContact: CONTACT_TEMPLATE,
		});
	} 
};

var keyTracker = 0;
var CONTACT_TEMPLATE = {
	name: "", 
	email: "", 
	description: "",
	errors: null,
};
setState({
  contacts: [
    {
    	key: 1, 
    	name: "James K Nelson", 
    	email: "james@jamesknelson.com", 
    	description: "Front-end Unicorn",
    	errors: null,
    },
    {
    	key: 2, 
    	name: "Jim", 
    	email: "jim@example.com",
    	description:  "Bogus example guy . . . ",
    	errors: null,
    },
    {
    	key: 3,
    	name: "Joseph O Anda",
    	email:  "orenmurasaki@gmail.com",
    	description:  "Front-end Ninja",
    	errors: null,
    },
    {
    	key: 4,
    	name: "Cloud Strife",
    	email: "cloud@avalanche.com",
    	description: "mercenary",
    	errors: null,
    },
    {
    	key: 5,
    	name: "Lloyd Irving",
    	email: "lloyd@tales.org",
    	description: "sword enthusiast",
    	errors: null,
    }
  ],
  newContact: CONTACT_TEMPLATE,
});

keyTracker = ++state.contacts.length;

