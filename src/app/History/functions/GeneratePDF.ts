import jsPDF from 'jspdf';
import moment from 'moment';

const GeneratePDF = (type: string, data: any[]) => {
    const doc = new jsPDF();
    let y = 0;
    let x = 0;

    const fisrtColumn = 45;
    const secondColumn = 35;
    const thirdColumn = 40;
    const fourtyColumn = 40;
    const fiveColumn = 45;
    const sixColumn = 35;

    const fontSize = 12; // Variable para controlar el tamaño de fuente

    // Obtener el ancho y alto de la página del PDF
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Configura el color de fondo del contenedor
    doc.setFillColor(0, 40, 89); // Color de fondo (RGB)
    // Dibuja un rectángulo de fondo (contenedor)
    const containerX = 0; // Posición X del contenedor
    const containerY = 0; // Posición Y del contenedor
    const containerWidth = pageWidth; // Ancho del contenedor (dejar un margen)
    const containerHeight = 30; // Alto del contenedor

    doc.rect(containerX, containerY, containerWidth, containerHeight, 'F');
    doc.addImage("/assets/l.png", 'PNG', x, y, 30, 30);
    x += 5;
    y += 40;

    ////////////////////////////////////////////////////////
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(fontSize); // Usando la variable de tamaño de fuente
    doc.setFont('helvetica', 'bold');
    doc.text(`Payment report`, x, y);
    y += 12;

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(fontSize); // Usando la variable de tamaño de fuente
    doc.setFont('helvetica', 'bold');
    doc.text(`Report date: ${moment().format('MM/DD/YYYY HH:mm')}`, x, y);
    y += 12;

    /////////////////////////////////
    let w1 = 0;


    let total = 0;
    const marginBottom = 20; // Espacio inferior antes de crear una nueva página
    for (let j = 0; j < data.length; j++) {
        console.log(data[j])

        const payments = data[j].payments

        doc.setFillColor(40, 40, 40);
        doc.rect(x, y - 9, fisrtColumn, 10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSize); // Usando la variable de tamaño de fuente
        doc.text(`Date`, x + 1, y);

        w1 += fisrtColumn;
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, secondColumn, 10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Barber`, x + w1 + 1, y);

        w1 += secondColumn;
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, thirdColumn, 10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Service`, x + w1 + 1, y);



        w1 += fourtyColumn;
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, fourtyColumn + 5, 10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Method`, x + w1 + 1, y);



        w1 += fiveColumn;
        doc.setFillColor(40, 40, 40);
        doc.rect(x + w1, y - 9, sixColumn, 10);
        doc.setFont('helvetica', 'bold');
        doc.text(`30% Total`, x + w1 + 1, y);

        y += 10;

        for (let i = 0; i < payments.length; i++) {
            doc.setFillColor(40, 40, 40);
            doc.rect(x, y - 9, fisrtColumn, 10);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(fontSize); // Usando la variable de tamaño de fuente
            doc.text(moment(payments[i].createdAt).format("MM/DD/YYYY HH:mm"), x + 1, y);

            w1 = fisrtColumn;
            doc.setFillColor(40, 40, 40);
            doc.rect(x + w1, y - 9, secondColumn, 10);
            doc.text(payments[i].worker, x + w1 + 1, y);

            w1 += secondColumn;
            doc.setFillColor(40, 40, 40);
            doc.rect(x + w1, y - 9, thirdColumn, 10);
            doc.text(`$${payments[i].price}`, x + w1 + 1, y);


            w1 += fourtyColumn;
            doc.setFillColor(40, 40, 40);
            doc.rect(x + w1, y - 9, fourtyColumn + 5, 10);
            doc.text(`${typeof payments[i].method === 'undefined' ? 'card' : payments[i].method}`, x + w1 + 1, y);



            w1 += fiveColumn;
            doc.setFillColor(40, 40, 40);
            doc.rect(x + w1, y - 9, sixColumn, 10);
            const sevenPercent = parseFloat(payments[i].price) * 0.7;
            const tip = parseFloat(payments[i].tip);
            const totalCalc = parseFloat(payments[i].price) * 0.3
            doc.text(`$${totalCalc.toFixed(2)}`, x + w1 + 1, y);
            //    total += totalCalc;

            y += 10;
            w1 = 40;
            if (y > pageHeight - marginBottom) {
                doc.addPage(); // Agregar una nueva página
                y = 20; // Reiniciar la posición Y para la nueva página
            }
            w1 = 0;
        }

        doc.setFillColor(40, 40, 40);
        doc.rect(x, y - 9, 165, 10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSize);
        doc.text(`Total ${data[j].worker}`, x + 1, y);

        doc.setFillColor(40, 40, 40);
        doc.rect(x + 165, y - 9, sixColumn, 10);
        doc.text(`$${(data[j].total * 0.3).toFixed(2)}`, x + 180 + 1, y);
        total += data[j].total.toFixed(2) * 0.3
        y += 20;
    }


    y += 10;
    doc.setFillColor(40, 40, 40);
    doc.rect(x, y - 9, 165, 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(fontSize);
    doc.text(`Total earnings`, x + 1, y);

    doc.setFillColor(40, 40, 40);
    doc.rect(x + 165, y - 9, sixColumn, 10);
    doc.text(`$${total.toFixed(2)}`, x + 180 + 1, y);

    doc.save(`${type}_report_${moment().format('MM_DD_YYYY')}.pdf`);
};

export default GeneratePDF;
