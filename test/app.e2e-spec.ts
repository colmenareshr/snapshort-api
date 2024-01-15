import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma/prisma.service'
import * as pactum from 'pactum'
import { AuthDto } from 'src/auth/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )

    await app.init()

    prisma = app.get(PrismaService)
    await prisma.cleanDb()

    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(async () => {
    await app.close()
  })

  const dto: AuthDto = {
    email: 'test7w@test.com',
    password: '123',
  }

  describe('Auth', () => {
    describe('signup', () => {
      it('email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      })

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
      })
    })

    describe('signin', () => {
      it('email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      })
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('users/me')
          .withHeaders({
            Authorization: `Bearer ${'userAt'}`,
          })
          .expectStatus(200)
      })
    })

    describe('Edit User', () => {})
  })

  describe('Link', () => {
    describe('Create link', () => {})

    describe('Get links', () => {})

    describe('Get link by Id', () => {})

    describe('Edit link', () => {})

    describe('Delete link', () => {})
  })

  it('should pass', () => {
    expect(true).toBeTruthy()
  })
})
