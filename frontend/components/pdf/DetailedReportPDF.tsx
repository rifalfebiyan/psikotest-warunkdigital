import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a',
    paddingBottom: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#0d9488',
    marginTop: 5,
    letterSpacing: 2,
  },
  metaText: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'right',
  },
  metaId: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    backgroundColor: '#f1f5f9',
    padding: 8,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  chartImage: {
    width: '100%',
    height: 'auto',
  },
  patternBox: {
    backgroundColor: '#0f172a',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  patternLabel: {
    color: '#2dd4bf',
    fontSize: 10,
    marginBottom: 5,
  },
  patternText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  patternTitle: {
    color: '#e2e8f0',
    fontSize: 14,
    marginTop: 5,
  },
  description: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.6,
    fontStyle: 'italic',
    marginBottom: 20,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0d9488',
  },
  listTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 15,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: '#0d9488',
  },
  itemText: {
    flex: 1,
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.4,
  },
  jobMatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 10,
  },
  jobBadge: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 9,
    color: '#0f172a',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8',
  },
});

interface Props {
  participant: any;
  profile: any;
  chartImageBase64: string;
  reportId: string;
}

export const DetailedReportPDF: React.FC<Props> = ({ participant, profile, chartImageBase64, reportId }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Laporan Hasil Asesmen</Text>
            <Text style={styles.headerSubtitle}>ANALISIS PERILAKU WARUNK DIGITAL</Text>
          </View>
          <View>
            <Text style={styles.metaText}>Metadata Validasi</Text>
            <Text style={styles.metaId}>ID-PX:{reportId}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Bagian A: Identitas Peserta</Text>
        <View style={{ ...styles.row, marginBottom: 20 }}>
          <View style={styles.col}>
            <Text style={styles.label}>Nama Subjek</Text>
            <Text style={styles.value}>{participant.name}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Email Kontak</Text>
            <Text style={styles.value}>{participant.email}</Text>
          </View>
        </View>
        <View style={{ ...styles.row, marginBottom: 30 }}>
          <View style={styles.col}>
            <Text style={styles.label}>Tanggal Asesmen</Text>
            <Text style={styles.value}>{new Date(participant.testDate || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <Text style={styles.value}>{participant.phone || '(No Contact)'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Bagian B: Pemetaan Perilaku</Text>
        <View style={styles.chartContainer}>
          {chartImageBase64 ? (
            <Image src={chartImageBase64} style={styles.chartImage} />
          ) : null}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Dokumen rahasia dihasilkan oleh Portal Psikometri Warunk Digital. © 2026</Text>
          <Text style={styles.footerText}>Hal 1</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Bagian C: Analisis Kepribadian</Text>
        
        <View style={styles.patternBox}>
          <Text style={styles.patternLabel}>POLA DOMINAN</Text>
          <Text style={styles.patternText}>{profile.pattern}</Text>
          <Text style={styles.patternTitle}>{profile.title.toUpperCase()}</Text>
        </View>

        <Text style={styles.description}>"{profile.description}"</Text>

        <View style={styles.row}>
          <View style={{ ...styles.col, paddingRight: 10 }}>
            <Text style={styles.listTitle}>KEKUATAN UTAMA</Text>
            {profile.strengths.map((str: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemText}>{str}</Text>
              </View>
            ))}
          </View>
          <View style={{ ...styles.col, paddingLeft: 10 }}>
            <Text style={styles.listTitle}>RISIKO PERILAKU</Text>
            {profile.fears.map((f: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={{ ...styles.listTitle, marginTop: 30 }}>REKOMENDASI KARIR / INDUSTRI</Text>
        <View style={styles.jobMatches}>
          {profile.jobMatches.map((job: string, i: number) => (
            <View key={i} style={styles.jobBadge}>
              <Text>{job}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 8, color: '#94a3b8', fontStyle: 'italic', marginTop: 40, lineHeight: 1.4 }}>
          *Penafian Profesional: Laporan ini dihasilkan secara terkomputerisasi melalui platform swa-asesmen (self-assessment). Hasil ini memberikan indikator kecenderungan perilaku dan bukan merupakan alat diagnostik psikologi klinis berlisensi.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dokumen rahasia dihasilkan oleh Portal Psikometri Warunk Digital. © 2026</Text>
          <Text style={styles.footerText}>Hal 2</Text>
        </View>
      </Page>
    </Document>
  );
};
