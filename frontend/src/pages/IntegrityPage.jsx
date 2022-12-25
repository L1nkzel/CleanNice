import { Box, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import React from "react";
import Header from "../components/ui/Header";

const IntegrityPage = () => {
  return (
    <>
      <Header
        url1="/customer"
        link1Name="Mina Sidor"
        url2="/customer/services"
        link2Name="Tjänster"
        url3="/customer/history"
        link3Name="Historik"
        url4="/customer/contact"
        link4Name="Kontakt"
        url5="/customer/integrity"
        link5Name="Integritetspolicy"
      />

      <Box sx={{ mt: 4, mx: 10 }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}
        >
          Integritetspolicy
        </Typography>
        <Typography sx={{ mt: 2, textAlign: "end", fontSize: 18 }}>
          25 Dec 2022
        </Typography>
        <Typography sx={{ mt: 2, fontSize: 18 }}>
          Behandling av personuppgifter på Städa Fint AB{" "}
        </Typography>

        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          {"\n"}För Städa Fint AB är personlig integritet viktigt. Vi
          eftersträvar en hög nivå av dataskydd. I denna policy förklarar vi hur
          vi samlar in och använder personuppgifter. Vi beskriver också dina
          rättigheter och hur du kan göra dem gällande. {"\n"}
          Du är alltid välkommen att kontakta oss om du har frågor om hur vi
          behandlar dina personuppgifter. Kontaktuppgifter står sist i denna
          text. {"\n"}
          {"\n"}
        </Typography>

        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Vad är en personuppgift och vad är en behandling av personuppgifter?{" "}
          </Typography>
          {"\n"}Personuppgifter är alla uppgifter om en levande fysisk person
          som direkt eller indirekt kan kopplas till den personen. Det handlar
          inte bara om namn och personnummer utan även om till exempel bilder
          och e-postadresser.{"\n"}
          Behandling av personuppgifter är allt som sker med personuppgifterna i
          IT-systemen, oavsett om det handlar om mobila enheter eller datorer.
          Det handlar om till exempel insamling, registrering, strukturering,
          lagring, bearbetning och överföring. I vissa fall kan även manuella
          register omfattas.
          {"\n"}
          {"\n"}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Personuppgiftsansvarig{" "}
          </Typography>
          {"\n"}För de behandlingar som sker inom Städa Fint AB:s verksamhet är
          The Pokémon Group International AB personuppgiftsansvarig. 12456-124
          Mariedalsvägen 32a
          {"\n"}
          {"\n"}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            Vilka personuppgifter samlar vi in om dig och varför?
          </Typography>
          {"\n"}Vi behandlar i huvudsak ditt namn, företagsnamn, adress och
          kontaktuppgifter. Vi behandlar dina personuppgifter för att kunna
          fullgöra våra tjänster enligt vår företagsmodell och för att uppfylla
          regler i lag och kollektivavtal.
          {"\n"}
          {"\n"}
        </Typography>

        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Personuppgiftsbiträden
          </Typography>
          {"\n"}I en del situationer är det nödvändigt för oss att anlita andra parter. Till exempel olika IT-leverantörer för HR-system eller elektroniska körjournaler. De är då personuppgiftsbiträden till oss. Vi kontrollerar personuppgiftsbiträden för att säkerställa att de garanterar säkerheten och sekretessen för personuppgifterna. När personuppgiftsbiträden anlitas sker det bara för de ändamål som är förenliga med de ändamål vi själva har för behandlingen. 
          {"\n"}
          {"\n"}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Aktörer som är självständigt personuppgiftsansvariga 
          </Typography>
          {"\n"}Vi delar även dina personuppgifter med vissa andra aktörer som är självständigt personuppgiftsansvariga, till exempel myndigheter som Skatteverket, när vi är skyldiga att lämna ut sådana uppgifter med stöd av lag eller myndighetsbeslut. När dina personuppgifter delas med en aktör som är självständigt personuppgiftsansvarig gäller den organisationens integritetspolicy och personuppgiftshantering.
          {"\n"}
          {"\n"}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Hur länge sparar vi dina personuppgifter? 
          </Typography>
          {"\n"}Vi sparar aldrig dina personuppgifter längre än vad som är nödvändigt för respektive ändamål. Vissa uppgifter i bokföringen behöver på grund av lagstiftning till exempel sparas minst sju år.
          {"\n"}
          {"\n"}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Vad är dina rättigheter som registrerad? 
          </Typography>
          {"\n"}Som registrerad har du enligt gällande lagstiftning ett antal rättigheter. Du har rätt till att få ett utdrag som visar vilka personuppgifter vi har registrerade om dig. Du kan begära rättelse av felaktiga uppgifter och i vissa fall radering.
          {"\n"}
          {"\n"}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {"\n"}
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Kontakta oss vid frågor om hur vi behandlar personuppgifter.
          </Typography>
          {"\n"}Om du har frågor om hur vi behandlar personuppgifter kontakta Beatrice Mattisdottir som är ansvarig för personuppgiftsfrågor.{"\n"}
Vi kan komma att göra ändringar i vår integritetspolicy. Den senaste versionen av integritetspolicyn finns alltid här på webbplatsen.

          {"\n"}
          {"\n"}
        </Typography>
      </Box>
    </>
  );
};

export default IntegrityPage;
