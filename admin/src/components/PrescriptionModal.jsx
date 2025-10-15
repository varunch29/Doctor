// import React, { useState, useEffect } from 'react';
// import { jsPDF } from 'jspdf';

// const PrescriptionModal = ({ isOpen, onClose, patientName, doctorName }) => {
//   const [medicines, setMedicines] = useState([{ name: '', tablets: '' }]);
//   const [error, setError] = useState('');

//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicines = [...medicines];
//     updatedMedicines[index][field] = value;
//     setMedicines(updatedMedicines);
//   };

//   const addMedicineRow = () => {
//     setMedicines([...medicines, { name: '', tablets: '' }]);
//   };

//   const removeMedicineRow = (index) => {
//     const updatedMedicines = medicines.filter((_, idx) => idx !== index);
//     setMedicines(updatedMedicines);
//   };

//   const handleSend = () => {
//     const isValid = medicines.some(
//       (med) => med.name.trim() !== '' && med.tablets.trim() !== ''
//     );

//     if (!isValid) {
//       setError('Please enter at least one medicine and number of tablets.');
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('Prescription', 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Patient: ${patientName}`, 20, 40);
//     doc.text(`Doctor: ${doctorName}`, 20, 50);

//     doc.text('Medications:', 20, 70);
//     let lineY = 80;
//     medicines.forEach((med, idx) => {
//       if (med.name.trim() !== '' && med.tablets.trim() !== '') {
//         doc.text(`${idx + 1}. ${med.name} - ${med.tablets} tablets`, 25, lineY);
//         lineY += 10;
//       }
//     });

//     doc.save(`Prescription_${patientName}.pdf`);
//     onClose();
//   };

//   useEffect(() => {
//     // Reset form when modal opens
//     if (isOpen) {
//       setMedicines([{ name: '', tablets: '' }]);
//       setError('');
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg">
//         <h2 className="text-xl font-semibold mb-4">Prescription for {patientName}</h2>

//         {medicines.map((medicine, index) => (
//           <div key={index} className="flex items-center gap-2 mb-2">
//             <input
//               type="text"
//               placeholder="Medicine Name"
//               value={medicine.name}
//               onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
//               className="border px-2 py-1 rounded w-1/2"
//             />
//             <input
//               type="number"
//               placeholder="No. of Tablets"
//               value={medicine.tablets}
//               onChange={(e) => handleMedicineChange(index, 'tablets', e.target.value)}
//               className="border px-2 py-1 rounded w-1/3"
//             />
//             {index !== 0 && (
//               <button
//                 onClick={() => removeMedicineRow(index)}
//                 className="text-red-500 text-sm"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}

//         <button
//           onClick={addMedicineRow}
//           className="text-blue-600 text-sm underline mb-4"
//         >
//           + Add Medicine
//         </button>

//         {error && (
//           <p className="text-red-500 text-sm mb-2">{error}</p>
//         )}

//         <div className="flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSend}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionModal;


import React, { useState, useEffect } from 'react';
import  jsPDF  from 'jspdf';
import emailjs from 'emailjs-com';

const PrescriptionModal = ({ isOpen, onClose, patientName, doctorName, patientEmail }) => {
  const [medicines, setMedicines] = useState([{ name: '', tablets: '' }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicineRow = () => {
    setMedicines([...medicines, { name: '', tablets: '' }]);
  };

  const removeMedicineRow = (index) => {
    const updatedMedicines = medicines.filter((_, idx) => idx !== index);
    setMedicines(updatedMedicines);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Prescription', 20, 20);

    doc.setFontSize(12);
    doc.text(`Patient: ${patientName}`, 20, 40);
    doc.text(`Doctor: ${doctorName}`, 20, 50);

    doc.text('Medications:', 20, 70);
    let lineY = 80;
    medicines.forEach((med, idx) => {
      if (med.name.trim() !== '' && med.tablets.trim() !== '') {
        doc.text(`${idx + 1}. ${med.name} - ${med.tablets} tablets`, 25, lineY);
        lineY += 10;
      }
    });

    return doc.output('datauristring').split(',')[1]; // Get only base64 part  // Return base64 PDF string
  };

  const handleSend = async () => {
    try {
      const isValid = medicines.some(
        (med) => med.name.trim() !== '' && med.tablets.trim() !== ''
      );

      if (!isValid) {
        setError('Please enter at least one medicine and number of tablets.');
        return;
      }

      setError('');
      setLoading(true);

      const pdfDataUri = generatePDF();

      const emailParams = {
        to_name: patientName,
        from_name: doctorName,
        message: 'Please find the attached prescription.',
        attachment: `data:application/pdf;base64,${pdfDataUri}`,
        to_email: patientEmail
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        emailParams,
        'YOUR_PUBLIC_KEY'
      );

      alert('Prescription sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error while sending prescription:', error);
      alert('Failed to send email. See console for details.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isOpen) {
      setMedicines([{ name: '', tablets: '' }]);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Prescription for {patientName}</h2>

        {medicines.map((medicine, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Medicine Name"
              value={medicine.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              className="border px-2 py-1 rounded w-1/2"
            />
            <input
              type="number"
              placeholder="No. of Tablets"
              value={medicine.tablets}
              onChange={(e) => handleMedicineChange(index, 'tablets', e.target.value)}
              className="border px-2 py-1 rounded w-1/3"
            />
            {index !== 0 && (
              <button
                onClick={() => removeMedicineRow(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addMedicineRow}
          className="text-blue-600 text-sm underline mb-4"
        >
          + Add Medicine
        </button>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
