from flask_restful import Resource, Api, request
from package.model import conn
class Doctors(Resource):
    """This contain apis to carry out activity with all doctors"""

    def get(self):
        """Retrive list of all the doctor"""

        doctors = conn.execute("SELECT * FROM doctor ORDER BY doc_date DESC").fetchall()
        return doctors



    def post(self):
        """Add the new doctor"""

        doctorInput = request.get_json(force=True)
        doc_first_name=doctorInput['doc_first_name']
        doc_last_name = doctorInput['doc_last_name']
        doc_ph_no = doctorInput['doc_ph_no']
        doc_address = doctorInput['doc_address']
        doc_specialty = doctorInput.get('doc_specialty', '')  # Adding specialty (default empty string)

        doctorInput['doc_id'] = conn.execute('''INSERT INTO doctor(doc_first_name, doc_last_name, doc_ph_no, doc_address, doc_specialty)
            VALUES(?,?,?,?,?)''', (doc_first_name, doc_last_name, doc_ph_no, doc_address, doc_specialty)).lastrowid
        conn.commit()
        return doctorInput

from flask_restful import reqparse

class Doctor(Resource):
    """It includes all the APIs carrying out the activity with the single doctor"""

    def get(self, id):
        """Get the details of the doctor by the doctor id"""
        doctor = conn.execute("SELECT * FROM doctor WHERE doc_id=?", (id,)).fetchall()
        return doctor

    def delete(self, id):
        """Delete the doctor by its id"""
        # Delete dependent records from the appointment table (if exists)
        conn.execute("DELETE FROM appointment WHERE doc_id=?", (id,))
        conn.commit()

        # Now delete the doctor
        conn.execute("DELETE FROM doctor WHERE doc_id=?", (id,))
        conn.commit()
        return {'msg': 'Successfully deleted'}

    def put(self, id):
        """Update the doctor by its id"""
        doctorInput = request.get_json(force=True)
        doc_first_name = doctorInput['doc_first_name']
        doc_last_name = doctorInput['doc_last_name']
        doc_ph_no = doctorInput['doc_ph_no']
        doc_address = doctorInput['doc_address']
        doc_specialty = doctorInput.get('doc_specialty', '')  # Optional field

        conn.execute(
            "UPDATE doctor SET doc_first_name=?, doc_last_name=?, doc_ph_no=?, doc_address=?, doc_specialty=? WHERE doc_id=?",
            (doc_first_name, doc_last_name, doc_ph_no, doc_address, doc_specialty, id)
        )
        conn.commit()
        return doctorInput

