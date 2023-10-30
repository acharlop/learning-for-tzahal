export const GET = async () => {
  return new Response(JSON.stringify({status: 'ok'}), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET',
      'Access-Control-Allow-Headers': '*',
    },
  })
}
