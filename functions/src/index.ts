import * as functions from 'firebase-functions'

export const onGameStart = functions.firestore.document('games/{gameId}').onUpdate((change, _context) => {
  const data = change.after.data() as { start: Date } | undefined
  const previousData = change.before.data() as { start: Date } | undefined
  console.log({ data })
  console.log({ previousData })

  if (data?.start === undefined) {
    return null
  }

  if (previousData?.start !== undefined) {
    return null
  }

  console.log('hi')

  return change.after.ref.set(
    {
      assignees: 1
    },
    { merge: true }
  )
})
