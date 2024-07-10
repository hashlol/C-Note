const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

global.document = {

  cookie: "_hp2_props.3001039959=propsValue; _ga=gaValue; _csrf_token=csrfValue;"

};

import {CourseService} from './course-service';

describe('CourseService', () => {

  let courseService;

  beforeEach(() => {

    fetchMock.resetMocks();

    courseService = new CourseService();

  });

  test('should get a cookie by name', () => {

    expect(courseService.getCookieByName('_ga')).toBe('gaValue');

    expect(courseService.getCookieByName('_csrf_token')).toBe('csrfValue;');

    expect(courseService.getCookieByName('non_existent')).toBeNull();

  });

  test('should concatenate cookies correctly', () => {

    expect(courseService.concatenatedCookies).toBe(

      "_hp2_props.3001039959=propsValue; _hp2_id.3001039959=null; _ga=gaValue; _ga_00FKZHDS5F=null; log_session_id=null; _legacy_normandy_session=null; canvas_session=null; _csrf_token=csrfValue;"

    );

  });

  test('should clean data correctly', () => {

    const dirtyData = [

      { longName: 'Math 101' },

      { longName: 'Science 102' },

      { longName: 'History 103' },

    ];

    const cleanedData = courseService.cleanData(dirtyData);

    expect(cleanedData).toEqual(['Math', 'Science', 'History']);

  });

  test('should fetch data with cookies', async () => {

    const mockResponse = [

      { longName: 'Math 101' },

      { longName: 'Science 102' },

    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await courseService.fetchDataWithCookie(courseService.concatenatedCookies);

    expect(data).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledWith(

      "https://fiu.instructure.com/api/v1/dashboard/dashboard_cards",

      expect.objectContaining({

        method: 'GET',

        headers: expect.objectContaining({

          Cookie: courseService.concatenatedCookies,

        }),

      })

    );

  });

  test('should get courses', async () => {

    const mockResponse = [

      { longName: 'Math 101' },

      { longName: 'Science 102' },

    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const courses = await courseService.getCourses();

    expect(courses).toEqual(['Math', 'Science']);

  });

});
 