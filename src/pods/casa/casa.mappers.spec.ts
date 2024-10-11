import { ObjectId } from 'mongodb';
import * as model from '#dals/index.js';
import * as apiModel from './casa.api-model.js';
import { mapCasaListFromApiToModel } from './casa.mappers.js';
describe('casa.mappers spec', () => {
    describe('mapCasaListFromApiToModel', () => {
            it.each<apiModel.Casa[]>([undefined, null, []])(
      'should return empty array when it feeds casaList equals %p',
      (casaList: any) => {
        // Arrange

        // Act
        const result: model.Casa[] = mapCasaListFromApiToModel(casaList);

        // Assert
        expect(result).toEqual([]);
      }
    );
        it('should return one mapped item in array when it feeds casaList with one item', () => {
            // Arrange
            const casaList: apiModel.Casa[] = [
            {
                id: '60c20a334bec6a37b08acec9',
                name: 'Ribeira Charming Duplex',
                summary: 'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube) - UNESCO World Heritage Site. Centenary building fully rehabilitated, without losing their original character.',
                street: 'Calle sfsfsdfsda',
                reviews: {
                    _id: new ObjectId("65f8b434a6cce7e182340531"),
                    autor: "Juan",
                    review: "Me encantó",
                    fecha: new Date('1998-11-16T11:25'),
                }
            },
            ];
            
            // Act
            const result: model.Casa[] = mapCasaListFromApiToModel(casaList);
            
            // Assert
            expect(result).toEqual([
                {
                   _id: new ObjectId('60c20a334bec6a37b08acec9'),
                   title: 'test-title',
                   releaseDate: new Date('2021-07-28T12:30:00'),
                   author: 'test-author',
                },
            ]);
        });
    });
  });
  