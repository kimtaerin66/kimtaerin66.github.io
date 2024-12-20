const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const serviceKey = process.env.SERVICE_KEY; 
    const response = await axios.get('http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp', {
      params: {
        collection: 'kmdb_new2',
        detail: 'Y',
        ServiceKey: serviceKey, // 환경 변수를 사용한 ServiceKey
        listCount: 150,
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'API 요청 실패', error: error.message });
  }
};
