import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Input } from "antd";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const FormPDF = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
            <Text><input type="email" name="" id="" /></Text>
       
        </View>
        <View style={styles.section}>
          <Text>Adresse email :</Text>
          <Text>{email}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FormPDF;
