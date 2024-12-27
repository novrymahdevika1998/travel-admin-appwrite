import { Button } from '@/components/ui/button';
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { db } from '@/database/db';
import { database } from '@/lib/appwrite';
import { Table, TableCaption } from '@chakra-ui/react';
import { ID } from 'appwrite';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Upload = () => {
  const [excelData, setExcelData] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const response = await db.customers.list([]);

      console.log(response)
    }

    init()
  }, [])


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target?.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Get the first sheet name
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file!);
  };

  const fileUpload = async () => {
    const data = excelData.slice(7).map((row) => {
      const payload = {
        no_ktp: row[1],
        name: row[2],
        gender: row[3],
        birth_place: row[6],
        birth_date: row[7],
        address: row[8],
        phone_number: row[9],
        passport_number: row[15],
        passport_release_date: row[22],
        passport_end_date: row[23],
      }

      return payload
    })

    await Promise.all(data.map(async (item) => {
      await database
        .createDocument(
          '67432558002caa14c825',
          "674325a90010bb23f17a",
          ID.unique(),
          item,
        )
    }))

  }

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded w-full"
      />
      <Button
        variant={'default'}
        onClick={fileUpload}
      >
        Upload
      </Button>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>


      {excelData.length > 0 && (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {excelData[0].map((header: string, index: number) => (
                <th
                  key={index}
                  className="border border-gray-300 p-2 text-left font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 even:bg-gray-50/50"
              >
                {row?.map((cell: any, cellIndex: any) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-200 p-2"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Upload