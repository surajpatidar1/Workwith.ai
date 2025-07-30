// lib/helper/removeObject.ts
import pdf from 'pdf-parse';

const removeObject = async (formData: FormData) => {
  const resume = formData.get('resume') as File;

  if (!resume) {
    throw new Error("Resume not found");
  }

  const arrayBuffer = await resume.arrayBuffer(); // ✅ No fs
  const dataBuffer = Buffer.from(arrayBuffer);    // ✅ Convert to buffer
  const pdfData = await pdf(dataBuffer);          // ✅ Extract text

  return pdfData; // Contains pdfData.text
};

export default removeObject;
