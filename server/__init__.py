from girder.api import access
from girder.api.rest import Resource, loadmodel
from girder.api.describe import Description, autoDescribeRoute, describeRoute
from girder.constants import AccessType, TokenScope


class HPCMP(Resource):
    def __init__(self):
        super(HPCMP, self).__init__();
        self.resourceName = 'hpcmp'

        self.route('POST', ('stream', ':id'), self.open_stream)
        self.route('POST', ('stream', ':id', 'read'), self.read_stream)
        self.route('DELETE', ('stream', ':id'), self.close_stream)

    @access.public(TokenScope.DATA_READ)
    @autoDescribeRoute(
        Description('Open a new stream for reading')
        .modelParam('id', model='file', level=AccessType.READ)
        .errorResponse('Read access was denied on this journal.', 403)
    )
    def open_stream(self, file, params):
        return file

    @access.public(TokenScope.DATA_READ)
    @autoDescribeRoute(
        Description('Open a new stream for reading')
        .modelParam('id', model='file', level=AccessType.READ)
        .errorResponse('Read access was denied on this journal.', 403)
    )
    def read_stream(self, file, params):
        return file

    @access.public(TokenScope.DATA_READ)
    @autoDescribeRoute(
        Description('Open a new stream for reading')
        .modelParam('id', model='file', level=AccessType.READ)
        .errorResponse('Read access was denied on this journal.', 403)
    )
    def close_stream(self, file, params):
        return file


def load(info):
    info['apiRoot'].hpcmp = HPCMP()
