Meteor.publish("Example", function() {
	return Collections.example.find();
});