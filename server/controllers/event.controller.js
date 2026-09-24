const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};

exports.registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.registrations.includes(req.user.id)) {
    return res.status(409).json({ message: "Already registered" });
  }

  event.registrations.push(req.user.id);
  await event.save();
  res.json({ message: "Registered successfully", event });
};

exports.cancelRegistration = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  event.registrations = event.registrations.filter(
    (id) => id.toString() !== req.user.id
  );
  await event.save();
  res.json({ message: "Registration cancelled", event });
};
