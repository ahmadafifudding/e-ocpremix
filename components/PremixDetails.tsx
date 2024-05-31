import * as Print from 'expo-print'
import dayjs from 'dayjs'
import { shareAsync } from 'expo-sharing'
import { Ionicons } from '@expo/vector-icons'
import { Tables } from '@/types/database.types'
import { calculateArea, calculateTonnage } from '@/lib'
import { Item } from './Item'
import { Separator } from './ui/Separator'
import { Button } from './ui/Button'

interface PremixDetailsProps {
  project: Tables<'projects'>
}

export function PremixDetails({ project }: PremixDetailsProps) {
  const {
    date,
    district,
    route,
    section,
    length,
    width,
    density,
    depth,
    lane,
  } = project
  const area = calculateArea(length, width)
  const tonnage = calculateTonnage(area, depth, density)

  const formattedLane = lane === 'fast-lane' ? 'Fast Lane' : 'Slow Lane'
  const formattedDate = dayjs(date).format('DD/MM/YYYY')
  const formattedTonnage = tonnage.toFixed(2)

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
      <title>Premix - E-OCPremix</title>
    </head>
    <style>
      body {
        padding: 30px;
      }
      table tbody tr th {
        width: 50%;
      }
    </style>
    <body>
      <div class="container-fluid">
      <div class="d-flex justify-content-center">
        <img
          src="https://zkzwnlrbouhxqcaxpagd.supabase.co/storage/v1/object/public/images/logo.jpeg"
          alt="E-OCPremix"
          height="80"
        />
      </div>
      </div>
      <h1 class="mt-5">Premix</h1>
      <table class="table mt-5">
        <tbody>
          <tr>
            <th scope="row">Date</th>
            <td>${formattedDate}</td>
          </tr>
          <tr>
            <th scope="row">District</th>
            <td>${district}</td>
          </tr>
          <tr>
            <th scope="row">Route</th>
            <td>${route}</td>
          </tr>
          <tr>
            <th scope="row">Section</th>
            <td>${section}</td>
          </tr>
          <tr>
            <th scope="row">Lane</th>
            <td>${formattedLane}</td>
          </tr>
          <tr>
            <th scope="row">Tonnage</th>
            <td>${formattedTonnage}</td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `
  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html })
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
  }

  return (
    <>
      <Item label='Date' data={formattedDate} />
      <Separator />
      <Item label='District' data={district} />
      <Separator />
      <Item label='Route' data={route} />
      <Separator />
      <Item label='Section' data={section} />
      <Separator />
      <Item label='Lane' data={formattedLane} />
      <Separator />
      <Item label='Tonnage' data={formattedTonnage} />
      <Button
        label='Print to PDF File'
        style={{ marginTop: 40 }}
        onPress={printToFile}
      >
        <Ionicons
          name='print-outline'
          size={20}
          color='white'
          style={{ marginRight: 8 }}
        />
      </Button>
    </>
  )
}
