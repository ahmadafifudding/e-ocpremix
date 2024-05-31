import { StyleSheet, Text } from 'react-native'
import dayjs from 'dayjs'
import { shareAsync } from 'expo-sharing'
import * as Print from 'expo-print'
import { Tables } from '@/types/database.types'
import { Ionicons } from '@expo/vector-icons'
import { Item } from './Item'
import { Button } from './ui/Button'
import { Separator } from './ui/Separator'

interface RecordWorkDetailsProps {
  project: Tables<'projects'>
}

export function RecordWorkDetails({ project }: RecordWorkDetailsProps) {
  const { date, district, route, section, description } = project

  const formattedDate = dayjs(date).format('DD/MM/YYYY')

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
      <title>Progress/Record Work - E-OCPremix</title>
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
        </tbody>
      </table>
      <div class="mt-5">
        <span>${description}</span>
      </div>
    </body>
  </html>
  `

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html })
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
  }

  return (
    <>
      <Item label='Date' data={date} />
      <Separator />
      <Item label='District' data={district} />
      <Separator />
      <Item label='Route' data={route} />
      <Separator />
      <Item label='Section' data={section} />
      <Text style={[styles.description]}>{description}</Text>
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

const styles = StyleSheet.create({
  description: {
    fontSize: 17,
    lineHeight: 22,
    color: '#616161',
    paddingHorizontal: 16,
    marginTop: 32,
  },
})
