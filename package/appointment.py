from flask_restful import Resource, Api, request
from package.model import conn


class Appointments(Resource):
    """This contain apis to carry out activity with all appointments"""

    def get(self):
        """Retrieve all the appointments and return in form of json"""

        # Including the `is_emergency` field in the SELECT query
        appointment = conn.execute("SELECT p.*,d.*,a.*, a.is_emergency from appointment a LEFT JOIN patient p ON a.pat_id = p.pat_id LEFT JOIN doctor d ON a.doc_id = d.doc_id ORDER BY appointment_date DESC").fetchall()
        return appointment

    def post(self):
        """Create the appointment by associating patient and doctor with appointment date"""

        appointment = request.get_json(force=True)
        pat_id = appointment['pat_id']
        doc_id = appointment['doc_id']
        appointment_date = appointment['appointment_date']
        is_emergency = appointment.get('is_emergency', False)  # Default to False if not provided
        
        appointment['app_id'] = conn.execute('''INSERT INTO appointment(pat_id, doc_id, appointment_date, is_emergency)
            VALUES(?,?,?,?)''', (pat_id, doc_id, appointment_date, is_emergency)).lastrowid
        conn.commit()
        return appointment


class Appointment(Resource):
    """This contains all API activities with a single appointment"""

    def get(self, id):
        """Retrieve a single appointment details by its id"""

        appointment = conn.execute("SELECT * FROM appointment WHERE app_id=?",(id,)).fetchall()
        return appointment


    def delete(self, id):
        """Delete the appointment by its id"""

        conn.execute("DELETE FROM appointment WHERE app_id=?",(id,))
        conn.commit()
        return {'msg': 'successfully deleted'}

    def put(self, id):
        """Update the appointment details by the appointment id"""

        appointment = request.get_json(force=True)
        pat_id = appointment['pat_id']
        doc_id = appointment['doc_id']
        is_emergency = appointment.get('is_emergency', False)  # Allow updating is_emergency field
        conn.execute("UPDATE appointment SET pat_id=?, doc_id=?, is_emergency=? WHERE app_id=?",
                     (pat_id, doc_id, is_emergency, id))
        conn.commit()
        return appointment
