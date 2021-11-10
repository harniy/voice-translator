import axios from "axios";



  const translateText = async (ownLanguage, finalText) => {
      
      let data
      try {
          const response = await axios.request({
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {to: `${ownLanguage.split('-')[0] === 'ru'? 'en' : 'ru' }`, 'api-version': '3.0', profanityAction: 'NoAction', textType: 'plain'},
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
              'x-rapidapi-key': '5004efafb9msh4bc462359e588c3p145a3cjsn5a13394dc6ae'
            },
            data: [
              {
                Text: `${finalText}`
              }
            ]
          })

          data = await response.data

      } catch (error) {
          console.log(error)
      }

      return data
  }


  export default translateText