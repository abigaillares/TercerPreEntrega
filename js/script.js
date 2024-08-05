
function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('previewImage').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function updatePreview() {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const location = document.getElementById('eventLocation').value;
    const description = document.getElementById('eventDescription').value;

    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewDate').textContent = `Fecha: ${date}`;
    document.getElementById('previewLocation').textContent = `Ubicación: ${location}`;
    document.getElementById('previewDescription').textContent = description;

    document.getElementById('invitationPreview').style.display = 'block';
}
function generatePDF() {
    updatePreview();

    html2canvas(document.querySelector("#invitationPreview")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('invitacion.pdf');
    });
}
function createButtons() {
    const form = document.getElementById('invitationForm');
    

    const generateButton = document.createElement('button');
    generateButton.type = 'button';
    generateButton.textContent = 'Generar PDF';
    generateButton.addEventListener('click', generatePDF);
    
    form.appendChild(generateButton);
}

function showMainContent() {
    document.getElementById('infoSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}


document.getElementById('uploadImage').addEventListener('change', loadImage);
document.getElementById('invitationForm').addEventListener('input', updatePreview);


window.addEventListener('DOMContentLoaded', createButtons);

document.getElementById('startButton').addEventListener('click', showMainContent);
