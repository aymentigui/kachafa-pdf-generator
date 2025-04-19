"use client";
import { Page, View, Document, Text, Font, Image } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";



export const styles = StyleSheet.create({
  page: {
    position: "relative",
  },
  header: {
    width: "100%",
    marginBottom: 2,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header2: {
    width: "100%",
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInside: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  headerInside2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  headerText2: {
    fontSize: 12,
    marginBottom: 4,
  },
  headerArabicText: {
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "LateefFont",
  },
  headerArabicText2: {
    fontSize: 12,
    fontFamily: "LateefFont",
  },
  headerArabicText3: {
    fontSize: 10,
    fontFamily: "LateefFont",
  },
  ligneGreen: {
    width: "100%",
    height: 10,
    backgroundColor: "#008000",
  },
  ligneRed: {
    width: "100%",
    height: 10,
    backgroundColor: "#FF0000",
  }
});


const PDFLayout = ({ data }: any) => {

  Font.register({
    family: "AmiriFont",
    fonts: [
      { src: "/Amiri-Regular.ttf" },
      { src: "/Amiri-Bold.ttf", fontWeight: "bold" },
    ]
  });
  Font.register({
    family: "LateefFont",
    fonts: [
      { src: "/Cairo-Regular.ttf" },
      { src: "/Cairo-Bold.ttf", fontWeight: "bold" },
    ]
  });

  if(!data || !data.divisions) {
    return <Document></Document>
  }

  return (<Document>
    <Page size="A4" style={styles.page}>
      {/* header */}
      <Image style={{ width: "100%", height: 100, position: "absolute", top: 0, right: 0, objectFit: "container" }} src="/header.jpg" />

      <View style={{ width: "100%", marginVertical: 100, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 10, paddingHorizontal: 35 }}>
        <View style={{}}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={{ fontFamily: "LateefFont", fontSize: 12 }}>...... / ...... / ......:</Text>
            <Text style={{ fontFamily: "LateefFont", fontSize: 12 }}>برج البحري في</Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12 }}>فوج السلام - برج البحري</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={{ fontFamily: "LateefFont", fontSize: 12 }}>...... / ......:</Text>
            <Text style={{ fontFamily: "LateefFont", fontSize: 12 }}>رقم</Text>
          </View>
        </View>
      </View>

      <View style={{ width: "100%", marginVertical: 30, display: "flex", flexDirection: "row", gap: 3, justifyContent: "center", alignItems: "center", }}>
        <Text style={{ fontFamily: "LateefFont", fontSize: 18, fontWeight: "bold" }}>الكشاف:</Text>
        <Text style={{ fontFamily: "LateefFont", fontSize: 18, fontWeight: "bold" }}>بطـاقة فنيـة لـوحدة</Text>
      </View>


      <View>
        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.activity}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>النشاط</Text>
        </View>

        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.date}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>الزمـان</Text>
        </View>

        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.place}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>المكان</Text>
        </View>

        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.duration}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>المدة</Text>
        </View>

        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.goal}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>الهدف</Text>
        </View>

        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.concerned}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>المعنيون</Text>
        </View>

        <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.amount}:</Text>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>مبلغ الاشتــراك</Text>
        </View>
      </View>


     { data.amount && data.divisions && data.divisions.length > 0 && 
       <View style={{ width: "100%", marginVertical: 30, paddingHorizontal: 5, display: "flex", flexDirection: "row", justifyContent: "center", gap: 0 }}>
       <View style={{ width: "20%", border: "1px solid black", }}>
         <View style={{ borderBottom: "1px solid black", height: 30, padding: 0, margin: 0, display: "flex", justifyContent: "center", alignItems: "center" }} >
           <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>المجموع</Text>
         </View>
         <View style={{ height: 60, padding: 0, margin: 0, display: "flex", justifyContent: "center", alignItems: "center" }} >
           <Text>{data.amount}</Text>
         </View>
       </View>
       <View style={{ width: "70%", border: "1px solid black", }}>
         <View style={{ borderBottom: "1px solid black", height: 30, padding: 0, margin: 0, display: "flex", justifyContent: "center", alignItems: "center" }} >
           <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>طريقة تقسيم المبلغ</Text>
         </View>
         <View style={{ padding: 0, margin: 0, display: "flex", flexDirection: "row", }}>
           {data.divisions.map((item: { name: string, value: string }, index: number) => (
             <View style={{ width: "100%", display: "flex", flexDirection: "column" }}>
               <View style={{ height: 30, borderBottom: "1px solid black", width: "100%", borderLeft: (index === 0 ? "none" : "1px solid black") }} >
                 <Text style={{ fontFamily: "LateefFont", textAlign: "center", fontSize: 12, fontWeight: "bold" }}>{item.name}</Text>
               </View>
               <View style={{ height: 30, width: "100%", borderLeft: (index === 0 ? "none" : "1px solid black") }} >
                 <Text style={{ fontFamily: "LateefFont", textAlign: "center", fontSize: 12, fontWeight: "bold" }}>{item.value}</Text>
               </View>
             </View>
           ))}
         </View>
       </View>
     </View>
     }

      <View style={{ width: "100%", marginVertical: 2, paddingHorizontal: 15, display: "flex", flexDirection: "row", gap: 3, justifyContent: "flex-end", alignItems: "center", }}>
        <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>افطار:</Text>
        <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>المستلزمات</Text>
      </View>

      <View style={{ width: "100%", marginVertical: 35, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 10, paddingHorizontal: 35 }}>
        <View style={{}}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>توقيع الادارة</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
          <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>مسؤولي النشاط</Text>
          <View style={{ width: "100%", display: "flex", flexDirection: "row", gap: 3, justifyContent: "center", alignItems: "center", }}>
            <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>{data.leader}:</Text>
            <Text style={{ fontFamily: "LateefFont", fontSize: 12, fontWeight: "bold" }}>القــائد</Text>
          </View>
        </View>
      </View>

      <Image style={{ width: "100%", height: 120, position: "absolute", bottom: 0, right: 0, objectFit: "container" }} src="/footer.jpg" />
    </Page>
  </Document>
  )
};

export default PDFLayout;