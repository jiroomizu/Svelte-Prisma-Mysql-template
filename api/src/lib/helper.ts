// making Categories to Posts relation object
// - couldn't unify these 2 functions because of Prisma typecasting
export const makeTagOnPostRelation = (
  idArray: number[],
  runnerId: number,
) => {

  const results = idArray.map(item => { 
    return {
      assignedBy: runnerId,
      tag: {
        connect: {
          id: item,
        }
      },
    }
  })
  return results
}

// making Categories to Posts relation object
// - couldn't unify these 2 functions because of Prisma typecasting
export const makeCategoryOnPostRelation = (
  idArray: number[],
  runnerId: number,
) => {

  const results = idArray.map(item => { 
    return {
      assignedBy: runnerId,
      category: {
        connect: {
          id: item,
        }
      },
    }
  })
  return results
}
