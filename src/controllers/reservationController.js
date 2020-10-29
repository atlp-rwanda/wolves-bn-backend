/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
import models from '../database/models';

const {
  reservation, trip, accomodation, room
} = models;

export default class Reservation {
  static getReservations(req, res) {
    const { id } = req.user;
    reservation.findAll({ where: { requester_id: id } }).then((data) => {
      if (data <= 0) {
        return res.status(404).send({ message: 'No room reservations found' });
      }
      return res.status(200).send(data);
    });
  }

  static reserveRoom(req, res) {
    const { id: requester_id } = req.user;
    const { check_in, check_out, room_id } = req.body;
    const now = new Date().setHours(0, 0, 0, 0);
    const checkIn = new Date(check_in);
    const checkOut = new Date(check_out);
    if (!check_in.match(/^([1-9][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) || !check_out.match(/^([1-9][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
      return res.status(400).send({ message: 'Your dates must be valid and should be in yyyy-mm-dd format' });
    }
    if (checkIn < now) {
      return res.status(400).send({ message: 'Check-in date is from the past' });
    }
    if (checkOut < now) {
      return res.status(400).send({ message: 'Check-out date is from the past' });
    }
    if (checkOut <= checkIn) {
      return res.status(400).send({ message: 'The period to stay is not logical' });
    }
    trip.findOne({ where: { requester_id } }).then((data) => {
      if (!data || data.request_status !== 'approved') {
        return res.status(404).send({ message: 'No trip found or not yet approved' });
      }
      const trip_id = data.id;
      const accommodation_id = data.accommodation;
      room.findOne({ where: { id: room_id } }).then((roomInfo) => {
        if (!roomInfo || accommodation_id != roomInfo.accomodationId) {
          return res.status(404).send({ message: 'No such room in your trip accommodation' });
        }
        reservation.findAll({ where: { room_id } }).then((reservations) => {
          for (let i = 0; i < reservations.length; i++) {
            if ((((reservations[i].check_in <= (checkIn || checkOut))
              && ((checkIn || checkOut)
                <= reservations[i].check_out)))
              || (((checkIn <= (reservations[i].check_in
                || reservations[i].check_out)) && ((reservations[i].check_in
                  || reservations[i].check_out)
                  <= checkOut)))
            ) {
              return res.status(409).send({ message: 'Room already reserved' });
            }
          }
          return reservation.create({
            requester_id,
            trip_id,
            accommodation_id,
            room_id,
            check_in,
            check_out
          }).then((booking) => { res.status(201).send(booking); })
            .catch((err) => res.status(400).send(err));
        });
      });
    });
  }

  static updateReservation(req, res) {
    const { id } = req.user;
    const { booking_id } = req.params;
    const { check_in, check_out, room_id } = req.body;
    const now = new Date().setHours(0, 0, 0, 0);
    const checkIn = new Date(check_in);
    const checkOut = new Date(check_out);
    if (!check_in.match(/^([1-9][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/) || !check_out.match(/^([1-9][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
      return res.status(400).send({ message: 'Your dates must be valid and should be in yyyy-mm-dd format' });
    }
    if (checkIn < now) {
      return res.status(400).send({ message: 'Check-in date is from the past' });
    }
    if (checkOut < now) {
      return res.status(400).send({ message: 'Check-out date is from the past' });
    }
    if (checkOut <= checkIn) {
      return res.status(400).send({ message: 'The period to stay is not logical' });
    }
    reservation.findOne({ where: { id: booking_id, requester_id: id } }).then((data) => {
      if (!data) {
        return res.status(404).send(
          { message: 'No such reservation in your trip accommodation' });
      }
      trip.findOne({ where: { requester_id: id } })
        .then((tripData) => {
          const accommodationId = tripData.accommodation;
          room.findOne({ where: { id: room_id } }).then((roomInfo) => {
            if (!roomInfo || accommodationId !== roomInfo.accomodationId) {
              return res.status(404).send({ message: 'No such room in your trip accommodation' });
            }
            reservation.findAll({ where: { room_id } })
              .then((reservations) => {
                for (let i = 0; i < reservations.length; i++) {
                  if ((((reservations[i].check_in <= (checkIn || checkOut))
                    && ((checkIn || checkOut)
                      <= reservations[i].check_out)))
                    || (((checkIn <= (reservations[i].check_in
                      || reservations[i].check_out)) && ((reservations[i].check_in
                        || reservations[i].check_out)
                        <= checkOut)))
                  ) {
                    return res.status(409).send({ message: 'Room already reserved' });
                  }
                }
                return data.update({
                  check_in,
                  check_out,
                  room_id
                }).then((updatedInfo) => {
                  res.status(200).send(updatedInfo);
                });
              });
          });
        });
    });
  }

  static deleteReservation(req, res) {
    const { id } = req.user;
    const { booking_id } = req.params;
    return reservation.destroy({
      where: {
        id: booking_id, requester_id: id
      }
    }).then(data => {
      if (data) res.status(204).json({ deleted: data, message: 'deleted successfully' });
      else res.status(409).json({ message: 'Nothing to delete' });
    }).catch(error => res.status(409).send(error));
  }
}
