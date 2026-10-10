/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const cadompart = $root.cadompart = (() => {

    /**
     * Namespace cadompart.
     * @exports cadompart
     * @namespace
     */
    const cadompart = {};

    cadompart.v0_2 = (function() {

        /**
         * Namespace v0_2.
         * @memberof cadompart
         * @namespace
         */
        const v0_2 = {};

        /**
         * LengthUnit enum.
         * @name cadompart.v0_2.LengthUnit
         * @enum {number}
         * @property {number} LENGTH_UNIT_UNSPECIFIED=0 LENGTH_UNIT_UNSPECIFIED value
         * @property {number} LENGTH_UNIT_METRES=1 LENGTH_UNIT_METRES value
         * @property {number} LENGTH_UNIT_MILLIMETRES=2 LENGTH_UNIT_MILLIMETRES value
         * @property {number} LENGTH_UNIT_INCHES=3 LENGTH_UNIT_INCHES value
         */
        v0_2.LengthUnit = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "LENGTH_UNIT_UNSPECIFIED"] = 0;
            values[valuesById[1] = "LENGTH_UNIT_METRES"] = 1;
            values[valuesById[2] = "LENGTH_UNIT_MILLIMETRES"] = 2;
            values[valuesById[3] = "LENGTH_UNIT_INCHES"] = 3;
            return values;
        })();

        /**
         * UpAxis enum.
         * @name cadompart.v0_2.UpAxis
         * @enum {number}
         * @property {number} UP_AXIS_UNSPECIFIED=0 UP_AXIS_UNSPECIFIED value
         * @property {number} UP_AXIS_Y=1 UP_AXIS_Y value
         * @property {number} UP_AXIS_Z=2 UP_AXIS_Z value
         */
        v0_2.UpAxis = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UP_AXIS_UNSPECIFIED"] = 0;
            values[valuesById[1] = "UP_AXIS_Y"] = 1;
            values[valuesById[2] = "UP_AXIS_Z"] = 2;
            return values;
        })();

        /**
         * ParamType enum.
         * @name cadompart.v0_2.ParamType
         * @enum {number}
         * @property {number} PARAM_TYPE_UNSPECIFIED=0 PARAM_TYPE_UNSPECIFIED value
         * @property {number} PARAM_TYPE_FLOAT=1 PARAM_TYPE_FLOAT value
         * @property {number} PARAM_TYPE_INT=2 PARAM_TYPE_INT value
         * @property {number} PARAM_TYPE_BOOL=3 PARAM_TYPE_BOOL value
         * @property {number} PARAM_TYPE_STRING=4 PARAM_TYPE_STRING value
         * @property {number} PARAM_TYPE_VEC2=5 PARAM_TYPE_VEC2 value
         * @property {number} PARAM_TYPE_VEC3=6 PARAM_TYPE_VEC3 value
         * @property {number} PARAM_TYPE_ANGLE=7 PARAM_TYPE_ANGLE value
         */
        v0_2.ParamType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "PARAM_TYPE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "PARAM_TYPE_FLOAT"] = 1;
            values[valuesById[2] = "PARAM_TYPE_INT"] = 2;
            values[valuesById[3] = "PARAM_TYPE_BOOL"] = 3;
            values[valuesById[4] = "PARAM_TYPE_STRING"] = 4;
            values[valuesById[5] = "PARAM_TYPE_VEC2"] = 5;
            values[valuesById[6] = "PARAM_TYPE_VEC3"] = 6;
            values[valuesById[7] = "PARAM_TYPE_ANGLE"] = 7;
            return values;
        })();

        /**
         * EndCondition enum.
         * @name cadompart.v0_2.EndCondition
         * @enum {number}
         * @property {number} END_CONDITION_UNSPECIFIED=0 END_CONDITION_UNSPECIFIED value
         * @property {number} END_CONDITION_BLIND=1 END_CONDITION_BLIND value
         * @property {number} END_CONDITION_THROUGH_ALL=2 END_CONDITION_THROUGH_ALL value
         * @property {number} END_CONDITION_TO_FACE=3 END_CONDITION_TO_FACE value
         * @property {number} END_CONDITION_TO_VERTEX=4 END_CONDITION_TO_VERTEX value
         * @property {number} END_CONDITION_MIDPLANE=5 END_CONDITION_MIDPLANE value
         * @property {number} END_CONDITION_OFFSET_FROM_FACE=6 END_CONDITION_OFFSET_FROM_FACE value
         */
        v0_2.EndCondition = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "END_CONDITION_UNSPECIFIED"] = 0;
            values[valuesById[1] = "END_CONDITION_BLIND"] = 1;
            values[valuesById[2] = "END_CONDITION_THROUGH_ALL"] = 2;
            values[valuesById[3] = "END_CONDITION_TO_FACE"] = 3;
            values[valuesById[4] = "END_CONDITION_TO_VERTEX"] = 4;
            values[valuesById[5] = "END_CONDITION_MIDPLANE"] = 5;
            values[valuesById[6] = "END_CONDITION_OFFSET_FROM_FACE"] = 6;
            return values;
        })();

        /**
         * BooleanOp enum.
         * @name cadompart.v0_2.BooleanOp
         * @enum {number}
         * @property {number} BOOLEAN_OP_UNSPECIFIED=0 BOOLEAN_OP_UNSPECIFIED value
         * @property {number} BOOLEAN_OP_UNION=1 BOOLEAN_OP_UNION value
         * @property {number} BOOLEAN_OP_SUBTRACT=2 BOOLEAN_OP_SUBTRACT value
         * @property {number} BOOLEAN_OP_INTERSECT=3 BOOLEAN_OP_INTERSECT value
         */
        v0_2.BooleanOp = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "BOOLEAN_OP_UNSPECIFIED"] = 0;
            values[valuesById[1] = "BOOLEAN_OP_UNION"] = 1;
            values[valuesById[2] = "BOOLEAN_OP_SUBTRACT"] = 2;
            values[valuesById[3] = "BOOLEAN_OP_INTERSECT"] = 3;
            return values;
        })();

        /**
         * HoleType enum.
         * @name cadompart.v0_2.HoleType
         * @enum {number}
         * @property {number} HOLE_TYPE_UNSPECIFIED=0 HOLE_TYPE_UNSPECIFIED value
         * @property {number} HOLE_TYPE_SIMPLE=1 HOLE_TYPE_SIMPLE value
         * @property {number} HOLE_TYPE_COUNTERBORE=2 HOLE_TYPE_COUNTERBORE value
         * @property {number} HOLE_TYPE_COUNTERSINK=3 HOLE_TYPE_COUNTERSINK value
         * @property {number} HOLE_TYPE_TAP=4 HOLE_TYPE_TAP value
         */
        v0_2.HoleType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "HOLE_TYPE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "HOLE_TYPE_SIMPLE"] = 1;
            values[valuesById[2] = "HOLE_TYPE_COUNTERBORE"] = 2;
            values[valuesById[3] = "HOLE_TYPE_COUNTERSINK"] = 3;
            values[valuesById[4] = "HOLE_TYPE_TAP"] = 4;
            return values;
        })();

        /**
         * DraftSide enum.
         * @name cadompart.v0_2.DraftSide
         * @enum {number}
         * @property {number} DRAFT_SIDE_UNSPECIFIED=0 DRAFT_SIDE_UNSPECIFIED value
         * @property {number} DRAFT_SIDE_NEUTRAL_PLANE=1 DRAFT_SIDE_NEUTRAL_PLANE value
         * @property {number} DRAFT_SIDE_PARTING_LINE=2 DRAFT_SIDE_PARTING_LINE value
         * @property {number} DRAFT_SIDE_STEP=3 DRAFT_SIDE_STEP value
         */
        v0_2.DraftSide = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DRAFT_SIDE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "DRAFT_SIDE_NEUTRAL_PLANE"] = 1;
            values[valuesById[2] = "DRAFT_SIDE_PARTING_LINE"] = 2;
            values[valuesById[3] = "DRAFT_SIDE_STEP"] = 3;
            return values;
        })();

        /**
         * PatternInstanceCountMode enum.
         * @name cadompart.v0_2.PatternInstanceCountMode
         * @enum {number}
         * @property {number} PATTERN_COUNT_TOTAL_INCLUDING_SOURCE=0 PATTERN_COUNT_TOTAL_INCLUDING_SOURCE value
         */
        v0_2.PatternInstanceCountMode = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "PATTERN_COUNT_TOTAL_INCLUDING_SOURCE"] = 0;
            return values;
        })();

        /**
         * SketchConstraintKind enum.
         * @name cadompart.v0_2.SketchConstraintKind
         * @enum {number}
         * @property {number} SKETCH_CONSTRAINT_UNSPECIFIED=0 SKETCH_CONSTRAINT_UNSPECIFIED value
         * @property {number} SKETCH_CONSTRAINT_COINCIDENT=1 SKETCH_CONSTRAINT_COINCIDENT value
         * @property {number} SKETCH_CONSTRAINT_HORIZONTAL=2 SKETCH_CONSTRAINT_HORIZONTAL value
         * @property {number} SKETCH_CONSTRAINT_VERTICAL=3 SKETCH_CONSTRAINT_VERTICAL value
         * @property {number} SKETCH_CONSTRAINT_PARALLEL=4 SKETCH_CONSTRAINT_PARALLEL value
         * @property {number} SKETCH_CONSTRAINT_PERPENDICULAR=5 SKETCH_CONSTRAINT_PERPENDICULAR value
         * @property {number} SKETCH_CONSTRAINT_TANGENT=6 SKETCH_CONSTRAINT_TANGENT value
         * @property {number} SKETCH_CONSTRAINT_EQUAL=7 SKETCH_CONSTRAINT_EQUAL value
         * @property {number} SKETCH_CONSTRAINT_MIDPOINT=8 SKETCH_CONSTRAINT_MIDPOINT value
         * @property {number} SKETCH_CONSTRAINT_SYMMETRIC=9 SKETCH_CONSTRAINT_SYMMETRIC value
         * @property {number} SKETCH_CONSTRAINT_FIXED=10 SKETCH_CONSTRAINT_FIXED value
         * @property {number} SKETCH_CONSTRAINT_CONCENTRIC=11 SKETCH_CONSTRAINT_CONCENTRIC value
         * @property {number} SKETCH_CONSTRAINT_COLLINEAR=12 SKETCH_CONSTRAINT_COLLINEAR value
         * @property {number} SKETCH_CONSTRAINT_DISTANCE=13 SKETCH_CONSTRAINT_DISTANCE value
         * @property {number} SKETCH_CONSTRAINT_ANGLE=14 SKETCH_CONSTRAINT_ANGLE value
         * @property {number} SKETCH_CONSTRAINT_RADIUS=15 SKETCH_CONSTRAINT_RADIUS value
         * @property {number} SKETCH_CONSTRAINT_DIAMETER=16 SKETCH_CONSTRAINT_DIAMETER value
         * @property {number} SKETCH_CONSTRAINT_LENGTH=17 SKETCH_CONSTRAINT_LENGTH value
         */
        v0_2.SketchConstraintKind = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SKETCH_CONSTRAINT_UNSPECIFIED"] = 0;
            values[valuesById[1] = "SKETCH_CONSTRAINT_COINCIDENT"] = 1;
            values[valuesById[2] = "SKETCH_CONSTRAINT_HORIZONTAL"] = 2;
            values[valuesById[3] = "SKETCH_CONSTRAINT_VERTICAL"] = 3;
            values[valuesById[4] = "SKETCH_CONSTRAINT_PARALLEL"] = 4;
            values[valuesById[5] = "SKETCH_CONSTRAINT_PERPENDICULAR"] = 5;
            values[valuesById[6] = "SKETCH_CONSTRAINT_TANGENT"] = 6;
            values[valuesById[7] = "SKETCH_CONSTRAINT_EQUAL"] = 7;
            values[valuesById[8] = "SKETCH_CONSTRAINT_MIDPOINT"] = 8;
            values[valuesById[9] = "SKETCH_CONSTRAINT_SYMMETRIC"] = 9;
            values[valuesById[10] = "SKETCH_CONSTRAINT_FIXED"] = 10;
            values[valuesById[11] = "SKETCH_CONSTRAINT_CONCENTRIC"] = 11;
            values[valuesById[12] = "SKETCH_CONSTRAINT_COLLINEAR"] = 12;
            values[valuesById[13] = "SKETCH_CONSTRAINT_DISTANCE"] = 13;
            values[valuesById[14] = "SKETCH_CONSTRAINT_ANGLE"] = 14;
            values[valuesById[15] = "SKETCH_CONSTRAINT_RADIUS"] = 15;
            values[valuesById[16] = "SKETCH_CONSTRAINT_DIAMETER"] = 16;
            values[valuesById[17] = "SKETCH_CONSTRAINT_LENGTH"] = 17;
            return values;
        })();

        /**
         * SketchPointRefKind enum.
         * @name cadompart.v0_2.SketchPointRefKind
         * @enum {number}
         * @property {number} SKETCH_POINT_REF_UNSPECIFIED=0 SKETCH_POINT_REF_UNSPECIFIED value
         * @property {number} SKETCH_POINT_REF_CURVE_START=1 SKETCH_POINT_REF_CURVE_START value
         * @property {number} SKETCH_POINT_REF_CURVE_END=2 SKETCH_POINT_REF_CURVE_END value
         * @property {number} SKETCH_POINT_REF_CURVE_CENTER=3 SKETCH_POINT_REF_CURVE_CENTER value
         * @property {number} SKETCH_POINT_REF_EXPLICIT=4 SKETCH_POINT_REF_EXPLICIT value
         */
        v0_2.SketchPointRefKind = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SKETCH_POINT_REF_UNSPECIFIED"] = 0;
            values[valuesById[1] = "SKETCH_POINT_REF_CURVE_START"] = 1;
            values[valuesById[2] = "SKETCH_POINT_REF_CURVE_END"] = 2;
            values[valuesById[3] = "SKETCH_POINT_REF_CURVE_CENTER"] = 3;
            values[valuesById[4] = "SKETCH_POINT_REF_EXPLICIT"] = 4;
            return values;
        })();

        v0_2.Vec2 = (function() {

            /**
             * Properties of a Vec2.
             * @memberof cadompart.v0_2
             * @interface IVec2
             * @property {number|null} [x] Vec2 x
             * @property {number|null} [y] Vec2 y
             */

            /**
             * Constructs a new Vec2.
             * @memberof cadompart.v0_2
             * @classdesc Represents a Vec2.
             * @implements IVec2
             * @constructor
             * @param {cadompart.v0_2.IVec2=} [properties] Properties to set
             */
            function Vec2(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Vec2 x.
             * @member {number} x
             * @memberof cadompart.v0_2.Vec2
             * @instance
             */
            Vec2.prototype.x = 0;

            /**
             * Vec2 y.
             * @member {number} y
             * @memberof cadompart.v0_2.Vec2
             * @instance
             */
            Vec2.prototype.y = 0;

            /**
             * Creates a new Vec2 instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {cadompart.v0_2.IVec2=} [properties] Properties to set
             * @returns {cadompart.v0_2.Vec2} Vec2 instance
             */
            Vec2.create = function create(properties) {
                return new Vec2(properties);
            };

            /**
             * Encodes the specified Vec2 message. Does not implicitly {@link cadompart.v0_2.Vec2.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {cadompart.v0_2.IVec2} message Vec2 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vec2.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.x);
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.y);
                return writer;
            };

            /**
             * Encodes the specified Vec2 message, length delimited. Does not implicitly {@link cadompart.v0_2.Vec2.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {cadompart.v0_2.IVec2} message Vec2 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vec2.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Vec2 message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.Vec2} Vec2
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vec2.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.Vec2();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.x = reader.double();
                            break;
                        }
                    case 2: {
                            message.y = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a Vec2 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.Vec2} Vec2
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vec2.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Vec2 message.
             * @function verify
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Vec2.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    if (typeof message.x !== "number")
                        return "x: number expected";
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    if (typeof message.y !== "number")
                        return "y: number expected";
                return null;
            };

            /**
             * Creates a Vec2 message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.Vec2} Vec2
             */
            Vec2.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.Vec2)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.Vec2: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.Vec2();
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                return message;
            };

            /**
             * Creates a plain object from a Vec2 message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {cadompart.v0_2.Vec2} message Vec2
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Vec2.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.x = 0;
                    object.y = 0;
                }
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                return object;
            };

            /**
             * Converts this Vec2 to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.Vec2
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Vec2.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Vec2
             * @function getTypeUrl
             * @memberof cadompart.v0_2.Vec2
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Vec2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.Vec2";
            };

            return Vec2;
        })();

        v0_2.Vec3 = (function() {

            /**
             * Properties of a Vec3.
             * @memberof cadompart.v0_2
             * @interface IVec3
             * @property {number|null} [x] Vec3 x
             * @property {number|null} [y] Vec3 y
             * @property {number|null} [z] Vec3 z
             */

            /**
             * Constructs a new Vec3.
             * @memberof cadompart.v0_2
             * @classdesc Represents a Vec3.
             * @implements IVec3
             * @constructor
             * @param {cadompart.v0_2.IVec3=} [properties] Properties to set
             */
            function Vec3(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Vec3 x.
             * @member {number} x
             * @memberof cadompart.v0_2.Vec3
             * @instance
             */
            Vec3.prototype.x = 0;

            /**
             * Vec3 y.
             * @member {number} y
             * @memberof cadompart.v0_2.Vec3
             * @instance
             */
            Vec3.prototype.y = 0;

            /**
             * Vec3 z.
             * @member {number} z
             * @memberof cadompart.v0_2.Vec3
             * @instance
             */
            Vec3.prototype.z = 0;

            /**
             * Creates a new Vec3 instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {cadompart.v0_2.IVec3=} [properties] Properties to set
             * @returns {cadompart.v0_2.Vec3} Vec3 instance
             */
            Vec3.create = function create(properties) {
                return new Vec3(properties);
            };

            /**
             * Encodes the specified Vec3 message. Does not implicitly {@link cadompart.v0_2.Vec3.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {cadompart.v0_2.IVec3} message Vec3 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vec3.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.x);
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.y);
                if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.z);
                return writer;
            };

            /**
             * Encodes the specified Vec3 message, length delimited. Does not implicitly {@link cadompart.v0_2.Vec3.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {cadompart.v0_2.IVec3} message Vec3 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vec3.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Vec3 message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.Vec3} Vec3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vec3.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.Vec3();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.x = reader.double();
                            break;
                        }
                    case 2: {
                            message.y = reader.double();
                            break;
                        }
                    case 3: {
                            message.z = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a Vec3 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.Vec3} Vec3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vec3.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Vec3 message.
             * @function verify
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Vec3.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    if (typeof message.x !== "number")
                        return "x: number expected";
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    if (typeof message.y !== "number")
                        return "y: number expected";
                if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                    if (typeof message.z !== "number")
                        return "z: number expected";
                return null;
            };

            /**
             * Creates a Vec3 message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.Vec3} Vec3
             */
            Vec3.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.Vec3)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.Vec3: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.Vec3();
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                if (object.z != null)
                    message.z = Number(object.z);
                return message;
            };

            /**
             * Creates a plain object from a Vec3 message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {cadompart.v0_2.Vec3} message Vec3
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Vec3.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.x = 0;
                    object.y = 0;
                    object.z = 0;
                }
                if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                    object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
                return object;
            };

            /**
             * Converts this Vec3 to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.Vec3
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Vec3.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Vec3
             * @function getTypeUrl
             * @memberof cadompart.v0_2.Vec3
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Vec3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.Vec3";
            };

            return Vec3;
        })();

        v0_2.Mat4 = (function() {

            /**
             * Properties of a Mat4.
             * @memberof cadompart.v0_2
             * @interface IMat4
             * @property {Array.<number>|null} [m] Mat4 m
             */

            /**
             * Constructs a new Mat4.
             * @memberof cadompart.v0_2
             * @classdesc Represents a Mat4.
             * @implements IMat4
             * @constructor
             * @param {cadompart.v0_2.IMat4=} [properties] Properties to set
             */
            function Mat4(properties) {
                this.m = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Mat4 m.
             * @member {Array.<number>} m
             * @memberof cadompart.v0_2.Mat4
             * @instance
             */
            Mat4.prototype.m = $util.emptyArray;

            /**
             * Creates a new Mat4 instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {cadompart.v0_2.IMat4=} [properties] Properties to set
             * @returns {cadompart.v0_2.Mat4} Mat4 instance
             */
            Mat4.create = function create(properties) {
                return new Mat4(properties);
            };

            /**
             * Encodes the specified Mat4 message. Does not implicitly {@link cadompart.v0_2.Mat4.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {cadompart.v0_2.IMat4} message Mat4 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Mat4.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.m != null && message.m.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (let i = 0; i < message.m.length; ++i)
                        writer.double(message.m[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified Mat4 message, length delimited. Does not implicitly {@link cadompart.v0_2.Mat4.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {cadompart.v0_2.IMat4} message Mat4 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Mat4.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Mat4 message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.Mat4} Mat4
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Mat4.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.Mat4();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.m && message.m.length))
                                message.m = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                if (end2 > reader.len)
                                    throw RangeError("index out of range");
                                reader.len = end2;
                                while (reader.pos < end2)
                                    message.m.push(reader.double());
                                if (reader.pos !== end2)
                                    throw RangeError("index out of range");
                                reader.len = end;
                            } else
                                message.m.push(reader.double());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a Mat4 message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.Mat4} Mat4
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Mat4.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Mat4 message.
             * @function verify
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Mat4.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.m != null && Object.hasOwnProperty.call(message, "m")) {
                    if (!Array.isArray(message.m))
                        return "m: array expected";
                    for (let i = 0; i < message.m.length; ++i)
                        if (typeof message.m[i] !== "number")
                            return "m: number[] expected";
                }
                return null;
            };

            /**
             * Creates a Mat4 message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.Mat4} Mat4
             */
            Mat4.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.Mat4)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.Mat4: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.Mat4();
                if (object.m) {
                    if (!Array.isArray(object.m))
                        throw TypeError(".cadompart.v0_2.Mat4.m: array expected");
                    message.m = [];
                    for (let i = 0; i < object.m.length; ++i)
                        message.m[i] = Number(object.m[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Mat4 message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {cadompart.v0_2.Mat4} message Mat4
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Mat4.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.m = [];
                if (message.m && message.m.length) {
                    object.m = [];
                    for (let j = 0; j < message.m.length; ++j)
                        object.m[j] = options.json && !isFinite(message.m[j]) ? String(message.m[j]) : message.m[j];
                }
                return object;
            };

            /**
             * Converts this Mat4 to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.Mat4
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Mat4.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Mat4
             * @function getTypeUrl
             * @memberof cadompart.v0_2.Mat4
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Mat4.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.Mat4";
            };

            return Mat4;
        })();

        v0_2.Parameter = (function() {

            /**
             * Properties of a Parameter.
             * @memberof cadompart.v0_2
             * @interface IParameter
             * @property {string|null} [id] Parameter id
             * @property {string|null} [name] Parameter name
             * @property {cadompart.v0_2.ParamType|null} [type] Parameter type
             * @property {number|null} [floatValue] Parameter floatValue
             * @property {number|Long|null} [intValue] Parameter intValue
             * @property {boolean|null} [boolValue] Parameter boolValue
             * @property {string|null} [stringValue] Parameter stringValue
             * @property {cadompart.v0_2.IVec2|null} [vec2Value] Parameter vec2Value
             * @property {cadompart.v0_2.IVec3|null} [vec3Value] Parameter vec3Value
             * @property {string|null} [unit] Parameter unit
             * @property {string|null} [expression] Parameter expression
             * @property {boolean|null} [driven] Parameter driven
             * @property {number|null} [minValue] Parameter minValue
             * @property {number|null} [maxValue] Parameter maxValue
             * @property {boolean|null} [hasMin] Parameter hasMin
             * @property {boolean|null} [hasMax] Parameter hasMax
             */

            /**
             * Constructs a new Parameter.
             * @memberof cadompart.v0_2
             * @classdesc Represents a Parameter.
             * @implements IParameter
             * @constructor
             * @param {cadompart.v0_2.IParameter=} [properties] Properties to set
             */
            function Parameter(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Parameter id.
             * @member {string} id
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.id = "";

            /**
             * Parameter name.
             * @member {string} name
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.name = "";

            /**
             * Parameter type.
             * @member {cadompart.v0_2.ParamType} type
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.type = 0;

            /**
             * Parameter floatValue.
             * @member {number|null|undefined} floatValue
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.floatValue = null;

            /**
             * Parameter intValue.
             * @member {number|Long|null|undefined} intValue
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.intValue = null;

            /**
             * Parameter boolValue.
             * @member {boolean|null|undefined} boolValue
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.boolValue = null;

            /**
             * Parameter stringValue.
             * @member {string|null|undefined} stringValue
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.stringValue = null;

            /**
             * Parameter vec2Value.
             * @member {cadompart.v0_2.IVec2|null|undefined} vec2Value
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.vec2Value = null;

            /**
             * Parameter vec3Value.
             * @member {cadompart.v0_2.IVec3|null|undefined} vec3Value
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.vec3Value = null;

            /**
             * Parameter unit.
             * @member {string} unit
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.unit = "";

            /**
             * Parameter expression.
             * @member {string} expression
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.expression = "";

            /**
             * Parameter driven.
             * @member {boolean} driven
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.driven = false;

            /**
             * Parameter minValue.
             * @member {number} minValue
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.minValue = 0;

            /**
             * Parameter maxValue.
             * @member {number} maxValue
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.maxValue = 0;

            /**
             * Parameter hasMin.
             * @member {boolean} hasMin
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.hasMin = false;

            /**
             * Parameter hasMax.
             * @member {boolean} hasMax
             * @memberof cadompart.v0_2.Parameter
             * @instance
             */
            Parameter.prototype.hasMax = false;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(Parameter.prototype, "_floatValue", {
                get: $util.oneOfGetter($oneOfFields = ["floatValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(Parameter.prototype, "_intValue", {
                get: $util.oneOfGetter($oneOfFields = ["intValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(Parameter.prototype, "_boolValue", {
                get: $util.oneOfGetter($oneOfFields = ["boolValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(Parameter.prototype, "_stringValue", {
                get: $util.oneOfGetter($oneOfFields = ["stringValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(Parameter.prototype, "_vec2Value", {
                get: $util.oneOfGetter($oneOfFields = ["vec2Value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(Parameter.prototype, "_vec3Value", {
                get: $util.oneOfGetter($oneOfFields = ["vec3Value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Parameter instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {cadompart.v0_2.IParameter=} [properties] Properties to set
             * @returns {cadompart.v0_2.Parameter} Parameter instance
             */
            Parameter.create = function create(properties) {
                return new Parameter(properties);
            };

            /**
             * Encodes the specified Parameter message. Does not implicitly {@link cadompart.v0_2.Parameter.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {cadompart.v0_2.IParameter} message Parameter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Parameter.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.floatValue);
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.intValue);
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.boolValue);
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.stringValue);
                if (message.vec2Value != null && Object.hasOwnProperty.call(message, "vec2Value"))
                    $root.cadompart.v0_2.Vec2.encode(message.vec2Value, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
                if (message.vec3Value != null && Object.hasOwnProperty.call(message, "vec3Value"))
                    $root.cadompart.v0_2.Vec3.encode(message.vec3Value, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
                if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.unit);
                if (message.expression != null && Object.hasOwnProperty.call(message, "expression"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.expression);
                if (message.driven != null && Object.hasOwnProperty.call(message, "driven"))
                    writer.uint32(/* id 12, wireType 0 =*/96).bool(message.driven);
                if (message.minValue != null && Object.hasOwnProperty.call(message, "minValue"))
                    writer.uint32(/* id 13, wireType 1 =*/105).double(message.minValue);
                if (message.maxValue != null && Object.hasOwnProperty.call(message, "maxValue"))
                    writer.uint32(/* id 14, wireType 1 =*/113).double(message.maxValue);
                if (message.hasMin != null && Object.hasOwnProperty.call(message, "hasMin"))
                    writer.uint32(/* id 15, wireType 0 =*/120).bool(message.hasMin);
                if (message.hasMax != null && Object.hasOwnProperty.call(message, "hasMax"))
                    writer.uint32(/* id 16, wireType 0 =*/128).bool(message.hasMax);
                return writer;
            };

            /**
             * Encodes the specified Parameter message, length delimited. Does not implicitly {@link cadompart.v0_2.Parameter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {cadompart.v0_2.IParameter} message Parameter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Parameter.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Parameter message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.Parameter} Parameter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Parameter.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.Parameter();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.type = reader.int32();
                            break;
                        }
                    case 4: {
                            message.floatValue = reader.double();
                            break;
                        }
                    case 5: {
                            message.intValue = reader.int64();
                            break;
                        }
                    case 6: {
                            message.boolValue = reader.bool();
                            break;
                        }
                    case 7: {
                            message.stringValue = reader.string();
                            break;
                        }
                    case 8: {
                            message.vec2Value = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 9: {
                            message.vec3Value = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 10: {
                            message.unit = reader.string();
                            break;
                        }
                    case 11: {
                            message.expression = reader.string();
                            break;
                        }
                    case 12: {
                            message.driven = reader.bool();
                            break;
                        }
                    case 13: {
                            message.minValue = reader.double();
                            break;
                        }
                    case 14: {
                            message.maxValue = reader.double();
                            break;
                        }
                    case 15: {
                            message.hasMin = reader.bool();
                            break;
                        }
                    case 16: {
                            message.hasMax = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a Parameter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.Parameter} Parameter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Parameter.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Parameter message.
             * @function verify
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Parameter.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        break;
                    }
                if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue")) {
                    properties._floatValue = 1;
                    if (typeof message.floatValue !== "number")
                        return "floatValue: number expected";
                }
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue")) {
                    properties._intValue = 1;
                    if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                        return "intValue: integer|Long expected";
                }
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue")) {
                    properties._boolValue = 1;
                    if (typeof message.boolValue !== "boolean")
                        return "boolValue: boolean expected";
                }
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue")) {
                    properties._stringValue = 1;
                    if (!$util.isString(message.stringValue))
                        return "stringValue: string expected";
                }
                if (message.vec2Value != null && Object.hasOwnProperty.call(message, "vec2Value")) {
                    properties._vec2Value = 1;
                    {
                        let error = $root.cadompart.v0_2.Vec2.verify(message.vec2Value, long + 1);
                        if (error)
                            return "vec2Value." + error;
                    }
                }
                if (message.vec3Value != null && Object.hasOwnProperty.call(message, "vec3Value")) {
                    properties._vec3Value = 1;
                    {
                        let error = $root.cadompart.v0_2.Vec3.verify(message.vec3Value, long + 1);
                        if (error)
                            return "vec3Value." + error;
                    }
                }
                if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                    if (!$util.isString(message.unit))
                        return "unit: string expected";
                if (message.expression != null && Object.hasOwnProperty.call(message, "expression"))
                    if (!$util.isString(message.expression))
                        return "expression: string expected";
                if (message.driven != null && Object.hasOwnProperty.call(message, "driven"))
                    if (typeof message.driven !== "boolean")
                        return "driven: boolean expected";
                if (message.minValue != null && Object.hasOwnProperty.call(message, "minValue"))
                    if (typeof message.minValue !== "number")
                        return "minValue: number expected";
                if (message.maxValue != null && Object.hasOwnProperty.call(message, "maxValue"))
                    if (typeof message.maxValue !== "number")
                        return "maxValue: number expected";
                if (message.hasMin != null && Object.hasOwnProperty.call(message, "hasMin"))
                    if (typeof message.hasMin !== "boolean")
                        return "hasMin: boolean expected";
                if (message.hasMax != null && Object.hasOwnProperty.call(message, "hasMax"))
                    if (typeof message.hasMax !== "boolean")
                        return "hasMax: boolean expected";
                return null;
            };

            /**
             * Creates a Parameter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.Parameter} Parameter
             */
            Parameter.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.Parameter)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.Parameter: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.Parameter();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "PARAM_TYPE_UNSPECIFIED":
                case 0:
                    message.type = 0;
                    break;
                case "PARAM_TYPE_FLOAT":
                case 1:
                    message.type = 1;
                    break;
                case "PARAM_TYPE_INT":
                case 2:
                    message.type = 2;
                    break;
                case "PARAM_TYPE_BOOL":
                case 3:
                    message.type = 3;
                    break;
                case "PARAM_TYPE_STRING":
                case 4:
                    message.type = 4;
                    break;
                case "PARAM_TYPE_VEC2":
                case 5:
                    message.type = 5;
                    break;
                case "PARAM_TYPE_VEC3":
                case 6:
                    message.type = 6;
                    break;
                case "PARAM_TYPE_ANGLE":
                case 7:
                    message.type = 7;
                    break;
                }
                if (object.floatValue != null)
                    message.floatValue = Number(object.floatValue);
                if (object.intValue != null)
                    if ($util.Long)
                        message.intValue = $util.Long.fromValue(object.intValue, false);
                    else if (typeof object.intValue === "string")
                        message.intValue = parseInt(object.intValue, 10);
                    else if (typeof object.intValue === "number")
                        message.intValue = object.intValue;
                    else if (typeof object.intValue === "object")
                        message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                if (object.boolValue != null)
                    message.boolValue = Boolean(object.boolValue);
                if (object.stringValue != null)
                    message.stringValue = String(object.stringValue);
                if (object.vec2Value != null) {
                    if (!$util.isObject(object.vec2Value))
                        throw TypeError(".cadompart.v0_2.Parameter.vec2Value: object expected");
                    message.vec2Value = $root.cadompart.v0_2.Vec2.fromObject(object.vec2Value, long + 1);
                }
                if (object.vec3Value != null) {
                    if (!$util.isObject(object.vec3Value))
                        throw TypeError(".cadompart.v0_2.Parameter.vec3Value: object expected");
                    message.vec3Value = $root.cadompart.v0_2.Vec3.fromObject(object.vec3Value, long + 1);
                }
                if (object.unit != null)
                    message.unit = String(object.unit);
                if (object.expression != null)
                    message.expression = String(object.expression);
                if (object.driven != null)
                    message.driven = Boolean(object.driven);
                if (object.minValue != null)
                    message.minValue = Number(object.minValue);
                if (object.maxValue != null)
                    message.maxValue = Number(object.maxValue);
                if (object.hasMin != null)
                    message.hasMin = Boolean(object.hasMin);
                if (object.hasMax != null)
                    message.hasMax = Boolean(object.hasMax);
                return message;
            };

            /**
             * Creates a plain object from a Parameter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {cadompart.v0_2.Parameter} message Parameter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Parameter.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.type = options.enums === String ? "PARAM_TYPE_UNSPECIFIED" : 0;
                    object.unit = "";
                    object.expression = "";
                    object.driven = false;
                    object.minValue = 0;
                    object.maxValue = 0;
                    object.hasMin = false;
                    object.hasMax = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    object.type = options.enums === String ? $root.cadompart.v0_2.ParamType[message.type] === undefined ? message.type : $root.cadompart.v0_2.ParamType[message.type] : message.type;
                if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue")) {
                    object.floatValue = options.json && !isFinite(message.floatValue) ? String(message.floatValue) : message.floatValue;
                    if (options.oneofs)
                        object._floatValue = "floatValue";
                }
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue")) {
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.intValue = typeof message.intValue === "number" ? BigInt(message.intValue) : $util.Long.fromBits(message.intValue.low >>> 0, message.intValue.high >>> 0, false).toBigInt();
                    else if (typeof message.intValue === "number")
                        object.intValue = options.longs === String ? String(message.intValue) : message.intValue;
                    else
                        object.intValue = options.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                    if (options.oneofs)
                        object._intValue = "intValue";
                }
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue")) {
                    object.boolValue = message.boolValue;
                    if (options.oneofs)
                        object._boolValue = "boolValue";
                }
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs)
                        object._stringValue = "stringValue";
                }
                if (message.vec2Value != null && Object.hasOwnProperty.call(message, "vec2Value")) {
                    object.vec2Value = $root.cadompart.v0_2.Vec2.toObject(message.vec2Value, options, q + 1);
                    if (options.oneofs)
                        object._vec2Value = "vec2Value";
                }
                if (message.vec3Value != null && Object.hasOwnProperty.call(message, "vec3Value")) {
                    object.vec3Value = $root.cadompart.v0_2.Vec3.toObject(message.vec3Value, options, q + 1);
                    if (options.oneofs)
                        object._vec3Value = "vec3Value";
                }
                if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                    object.unit = message.unit;
                if (message.expression != null && Object.hasOwnProperty.call(message, "expression"))
                    object.expression = message.expression;
                if (message.driven != null && Object.hasOwnProperty.call(message, "driven"))
                    object.driven = message.driven;
                if (message.minValue != null && Object.hasOwnProperty.call(message, "minValue"))
                    object.minValue = options.json && !isFinite(message.minValue) ? String(message.minValue) : message.minValue;
                if (message.maxValue != null && Object.hasOwnProperty.call(message, "maxValue"))
                    object.maxValue = options.json && !isFinite(message.maxValue) ? String(message.maxValue) : message.maxValue;
                if (message.hasMin != null && Object.hasOwnProperty.call(message, "hasMin"))
                    object.hasMin = message.hasMin;
                if (message.hasMax != null && Object.hasOwnProperty.call(message, "hasMax"))
                    object.hasMax = message.hasMax;
                return object;
            };

            /**
             * Converts this Parameter to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.Parameter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Parameter.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Parameter
             * @function getTypeUrl
             * @memberof cadompart.v0_2.Parameter
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Parameter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.Parameter";
            };

            return Parameter;
        })();

        v0_2.FaceRef = (function() {

            /**
             * Properties of a FaceRef.
             * @memberof cadompart.v0_2
             * @interface IFaceRef
             * @property {string|null} [id] FaceRef id
             */

            /**
             * Constructs a new FaceRef.
             * @memberof cadompart.v0_2
             * @classdesc Represents a FaceRef.
             * @implements IFaceRef
             * @constructor
             * @param {cadompart.v0_2.IFaceRef=} [properties] Properties to set
             */
            function FaceRef(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FaceRef id.
             * @member {string} id
             * @memberof cadompart.v0_2.FaceRef
             * @instance
             */
            FaceRef.prototype.id = "";

            /**
             * Creates a new FaceRef instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {cadompart.v0_2.IFaceRef=} [properties] Properties to set
             * @returns {cadompart.v0_2.FaceRef} FaceRef instance
             */
            FaceRef.create = function create(properties) {
                return new FaceRef(properties);
            };

            /**
             * Encodes the specified FaceRef message. Does not implicitly {@link cadompart.v0_2.FaceRef.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {cadompart.v0_2.IFaceRef} message FaceRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FaceRef.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Encodes the specified FaceRef message, length delimited. Does not implicitly {@link cadompart.v0_2.FaceRef.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {cadompart.v0_2.IFaceRef} message FaceRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FaceRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a FaceRef message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.FaceRef} FaceRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FaceRef.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.FaceRef();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a FaceRef message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.FaceRef} FaceRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FaceRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FaceRef message.
             * @function verify
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FaceRef.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates a FaceRef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.FaceRef} FaceRef
             */
            FaceRef.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.FaceRef)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.FaceRef: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.FaceRef();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a FaceRef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {cadompart.v0_2.FaceRef} message FaceRef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FaceRef.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this FaceRef to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.FaceRef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FaceRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for FaceRef
             * @function getTypeUrl
             * @memberof cadompart.v0_2.FaceRef
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            FaceRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.FaceRef";
            };

            return FaceRef;
        })();

        v0_2.EdgeRef = (function() {

            /**
             * Properties of an EdgeRef.
             * @memberof cadompart.v0_2
             * @interface IEdgeRef
             * @property {string|null} [id] EdgeRef id
             */

            /**
             * Constructs a new EdgeRef.
             * @memberof cadompart.v0_2
             * @classdesc Represents an EdgeRef.
             * @implements IEdgeRef
             * @constructor
             * @param {cadompart.v0_2.IEdgeRef=} [properties] Properties to set
             */
            function EdgeRef(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EdgeRef id.
             * @member {string} id
             * @memberof cadompart.v0_2.EdgeRef
             * @instance
             */
            EdgeRef.prototype.id = "";

            /**
             * Creates a new EdgeRef instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {cadompart.v0_2.IEdgeRef=} [properties] Properties to set
             * @returns {cadompart.v0_2.EdgeRef} EdgeRef instance
             */
            EdgeRef.create = function create(properties) {
                return new EdgeRef(properties);
            };

            /**
             * Encodes the specified EdgeRef message. Does not implicitly {@link cadompart.v0_2.EdgeRef.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {cadompart.v0_2.IEdgeRef} message EdgeRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EdgeRef.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Encodes the specified EdgeRef message, length delimited. Does not implicitly {@link cadompart.v0_2.EdgeRef.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {cadompart.v0_2.IEdgeRef} message EdgeRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EdgeRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes an EdgeRef message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.EdgeRef} EdgeRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EdgeRef.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.EdgeRef();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes an EdgeRef message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.EdgeRef} EdgeRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EdgeRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an EdgeRef message.
             * @function verify
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EdgeRef.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates an EdgeRef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.EdgeRef} EdgeRef
             */
            EdgeRef.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.EdgeRef)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.EdgeRef: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.EdgeRef();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from an EdgeRef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {cadompart.v0_2.EdgeRef} message EdgeRef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EdgeRef.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this EdgeRef to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.EdgeRef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EdgeRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for EdgeRef
             * @function getTypeUrl
             * @memberof cadompart.v0_2.EdgeRef
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            EdgeRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.EdgeRef";
            };

            return EdgeRef;
        })();

        v0_2.VertexRef = (function() {

            /**
             * Properties of a VertexRef.
             * @memberof cadompart.v0_2
             * @interface IVertexRef
             * @property {string|null} [id] VertexRef id
             */

            /**
             * Constructs a new VertexRef.
             * @memberof cadompart.v0_2
             * @classdesc Represents a VertexRef.
             * @implements IVertexRef
             * @constructor
             * @param {cadompart.v0_2.IVertexRef=} [properties] Properties to set
             */
            function VertexRef(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VertexRef id.
             * @member {string} id
             * @memberof cadompart.v0_2.VertexRef
             * @instance
             */
            VertexRef.prototype.id = "";

            /**
             * Creates a new VertexRef instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {cadompart.v0_2.IVertexRef=} [properties] Properties to set
             * @returns {cadompart.v0_2.VertexRef} VertexRef instance
             */
            VertexRef.create = function create(properties) {
                return new VertexRef(properties);
            };

            /**
             * Encodes the specified VertexRef message. Does not implicitly {@link cadompart.v0_2.VertexRef.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {cadompart.v0_2.IVertexRef} message VertexRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VertexRef.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Encodes the specified VertexRef message, length delimited. Does not implicitly {@link cadompart.v0_2.VertexRef.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {cadompart.v0_2.IVertexRef} message VertexRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VertexRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a VertexRef message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.VertexRef} VertexRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VertexRef.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.VertexRef();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a VertexRef message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.VertexRef} VertexRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VertexRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VertexRef message.
             * @function verify
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VertexRef.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates a VertexRef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.VertexRef} VertexRef
             */
            VertexRef.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.VertexRef)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.VertexRef: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.VertexRef();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a VertexRef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {cadompart.v0_2.VertexRef} message VertexRef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VertexRef.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this VertexRef to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.VertexRef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VertexRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for VertexRef
             * @function getTypeUrl
             * @memberof cadompart.v0_2.VertexRef
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            VertexRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.VertexRef";
            };

            return VertexRef;
        })();

        v0_2.BodyRef = (function() {

            /**
             * Properties of a BodyRef.
             * @memberof cadompart.v0_2
             * @interface IBodyRef
             * @property {string|null} [id] BodyRef id
             */

            /**
             * Constructs a new BodyRef.
             * @memberof cadompart.v0_2
             * @classdesc Represents a BodyRef.
             * @implements IBodyRef
             * @constructor
             * @param {cadompart.v0_2.IBodyRef=} [properties] Properties to set
             */
            function BodyRef(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BodyRef id.
             * @member {string} id
             * @memberof cadompart.v0_2.BodyRef
             * @instance
             */
            BodyRef.prototype.id = "";

            /**
             * Creates a new BodyRef instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {cadompart.v0_2.IBodyRef=} [properties] Properties to set
             * @returns {cadompart.v0_2.BodyRef} BodyRef instance
             */
            BodyRef.create = function create(properties) {
                return new BodyRef(properties);
            };

            /**
             * Encodes the specified BodyRef message. Does not implicitly {@link cadompart.v0_2.BodyRef.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {cadompart.v0_2.IBodyRef} message BodyRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BodyRef.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Encodes the specified BodyRef message, length delimited. Does not implicitly {@link cadompart.v0_2.BodyRef.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {cadompart.v0_2.IBodyRef} message BodyRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BodyRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a BodyRef message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.BodyRef} BodyRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BodyRef.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.BodyRef();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a BodyRef message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.BodyRef} BodyRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BodyRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BodyRef message.
             * @function verify
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BodyRef.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates a BodyRef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.BodyRef} BodyRef
             */
            BodyRef.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.BodyRef)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.BodyRef: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.BodyRef();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a BodyRef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {cadompart.v0_2.BodyRef} message BodyRef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BodyRef.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this BodyRef to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.BodyRef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BodyRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BodyRef
             * @function getTypeUrl
             * @memberof cadompart.v0_2.BodyRef
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BodyRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.BodyRef";
            };

            return BodyRef;
        })();

        v0_2.DatumPlane = (function() {

            /**
             * Properties of a DatumPlane.
             * @memberof cadompart.v0_2
             * @interface IDatumPlane
             * @property {string|null} [id] DatumPlane id
             * @property {string|null} [name] DatumPlane name
             * @property {cadompart.v0_2.IVec3|null} [origin] DatumPlane origin
             * @property {cadompart.v0_2.IVec3|null} [normal] DatumPlane normal
             * @property {string|null} [fromPlaneId] DatumPlane fromPlaneId
             * @property {number|null} [offset] DatumPlane offset
             */

            /**
             * Constructs a new DatumPlane.
             * @memberof cadompart.v0_2
             * @classdesc Represents a DatumPlane.
             * @implements IDatumPlane
             * @constructor
             * @param {cadompart.v0_2.IDatumPlane=} [properties] Properties to set
             */
            function DatumPlane(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DatumPlane id.
             * @member {string} id
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             */
            DatumPlane.prototype.id = "";

            /**
             * DatumPlane name.
             * @member {string} name
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             */
            DatumPlane.prototype.name = "";

            /**
             * DatumPlane origin.
             * @member {cadompart.v0_2.IVec3|null|undefined} origin
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             */
            DatumPlane.prototype.origin = null;

            /**
             * DatumPlane normal.
             * @member {cadompart.v0_2.IVec3|null|undefined} normal
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             */
            DatumPlane.prototype.normal = null;

            /**
             * DatumPlane fromPlaneId.
             * @member {string} fromPlaneId
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             */
            DatumPlane.prototype.fromPlaneId = "";

            /**
             * DatumPlane offset.
             * @member {number} offset
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             */
            DatumPlane.prototype.offset = 0;

            /**
             * Creates a new DatumPlane instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {cadompart.v0_2.IDatumPlane=} [properties] Properties to set
             * @returns {cadompart.v0_2.DatumPlane} DatumPlane instance
             */
            DatumPlane.create = function create(properties) {
                return new DatumPlane(properties);
            };

            /**
             * Encodes the specified DatumPlane message. Does not implicitly {@link cadompart.v0_2.DatumPlane.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {cadompart.v0_2.IDatumPlane} message DatumPlane message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatumPlane.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                    $root.cadompart.v0_2.Vec3.encode(message.origin, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.normal != null && Object.hasOwnProperty.call(message, "normal"))
                    $root.cadompart.v0_2.Vec3.encode(message.normal, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                if (message.fromPlaneId != null && Object.hasOwnProperty.call(message, "fromPlaneId"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.fromPlaneId);
                if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.offset);
                return writer;
            };

            /**
             * Encodes the specified DatumPlane message, length delimited. Does not implicitly {@link cadompart.v0_2.DatumPlane.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {cadompart.v0_2.IDatumPlane} message DatumPlane message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatumPlane.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a DatumPlane message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.DatumPlane} DatumPlane
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatumPlane.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.DatumPlane();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.origin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.normal = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 5: {
                            message.fromPlaneId = reader.string();
                            break;
                        }
                    case 6: {
                            message.offset = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a DatumPlane message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.DatumPlane} DatumPlane
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatumPlane.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DatumPlane message.
             * @function verify
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DatumPlane.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.origin, long + 1);
                    if (error)
                        return "origin." + error;
                }
                if (message.normal != null && Object.hasOwnProperty.call(message, "normal")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.normal, long + 1);
                    if (error)
                        return "normal." + error;
                }
                if (message.fromPlaneId != null && Object.hasOwnProperty.call(message, "fromPlaneId"))
                    if (!$util.isString(message.fromPlaneId))
                        return "fromPlaneId: string expected";
                if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                    if (typeof message.offset !== "number")
                        return "offset: number expected";
                return null;
            };

            /**
             * Creates a DatumPlane message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.DatumPlane} DatumPlane
             */
            DatumPlane.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.DatumPlane)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.DatumPlane: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.DatumPlane();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.origin != null) {
                    if (!$util.isObject(object.origin))
                        throw TypeError(".cadompart.v0_2.DatumPlane.origin: object expected");
                    message.origin = $root.cadompart.v0_2.Vec3.fromObject(object.origin, long + 1);
                }
                if (object.normal != null) {
                    if (!$util.isObject(object.normal))
                        throw TypeError(".cadompart.v0_2.DatumPlane.normal: object expected");
                    message.normal = $root.cadompart.v0_2.Vec3.fromObject(object.normal, long + 1);
                }
                if (object.fromPlaneId != null)
                    message.fromPlaneId = String(object.fromPlaneId);
                if (object.offset != null)
                    message.offset = Number(object.offset);
                return message;
            };

            /**
             * Creates a plain object from a DatumPlane message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {cadompart.v0_2.DatumPlane} message DatumPlane
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DatumPlane.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.origin = null;
                    object.normal = null;
                    object.fromPlaneId = "";
                    object.offset = 0;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                    object.origin = $root.cadompart.v0_2.Vec3.toObject(message.origin, options, q + 1);
                if (message.normal != null && Object.hasOwnProperty.call(message, "normal"))
                    object.normal = $root.cadompart.v0_2.Vec3.toObject(message.normal, options, q + 1);
                if (message.fromPlaneId != null && Object.hasOwnProperty.call(message, "fromPlaneId"))
                    object.fromPlaneId = message.fromPlaneId;
                if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                    object.offset = options.json && !isFinite(message.offset) ? String(message.offset) : message.offset;
                return object;
            };

            /**
             * Converts this DatumPlane to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.DatumPlane
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DatumPlane.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DatumPlane
             * @function getTypeUrl
             * @memberof cadompart.v0_2.DatumPlane
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DatumPlane.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.DatumPlane";
            };

            return DatumPlane;
        })();

        v0_2.DatumAxis = (function() {

            /**
             * Properties of a DatumAxis.
             * @memberof cadompart.v0_2
             * @interface IDatumAxis
             * @property {string|null} [id] DatumAxis id
             * @property {string|null} [name] DatumAxis name
             * @property {cadompart.v0_2.IVec3|null} [origin] DatumAxis origin
             * @property {cadompart.v0_2.IVec3|null} [direction] DatumAxis direction
             */

            /**
             * Constructs a new DatumAxis.
             * @memberof cadompart.v0_2
             * @classdesc Represents a DatumAxis.
             * @implements IDatumAxis
             * @constructor
             * @param {cadompart.v0_2.IDatumAxis=} [properties] Properties to set
             */
            function DatumAxis(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DatumAxis id.
             * @member {string} id
             * @memberof cadompart.v0_2.DatumAxis
             * @instance
             */
            DatumAxis.prototype.id = "";

            /**
             * DatumAxis name.
             * @member {string} name
             * @memberof cadompart.v0_2.DatumAxis
             * @instance
             */
            DatumAxis.prototype.name = "";

            /**
             * DatumAxis origin.
             * @member {cadompart.v0_2.IVec3|null|undefined} origin
             * @memberof cadompart.v0_2.DatumAxis
             * @instance
             */
            DatumAxis.prototype.origin = null;

            /**
             * DatumAxis direction.
             * @member {cadompart.v0_2.IVec3|null|undefined} direction
             * @memberof cadompart.v0_2.DatumAxis
             * @instance
             */
            DatumAxis.prototype.direction = null;

            /**
             * Creates a new DatumAxis instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {cadompart.v0_2.IDatumAxis=} [properties] Properties to set
             * @returns {cadompart.v0_2.DatumAxis} DatumAxis instance
             */
            DatumAxis.create = function create(properties) {
                return new DatumAxis(properties);
            };

            /**
             * Encodes the specified DatumAxis message. Does not implicitly {@link cadompart.v0_2.DatumAxis.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {cadompart.v0_2.IDatumAxis} message DatumAxis message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatumAxis.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                    $root.cadompart.v0_2.Vec3.encode(message.origin, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    $root.cadompart.v0_2.Vec3.encode(message.direction, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DatumAxis message, length delimited. Does not implicitly {@link cadompart.v0_2.DatumAxis.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {cadompart.v0_2.IDatumAxis} message DatumAxis message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatumAxis.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a DatumAxis message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.DatumAxis} DatumAxis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatumAxis.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.DatumAxis();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.origin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.direction = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a DatumAxis message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.DatumAxis} DatumAxis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatumAxis.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DatumAxis message.
             * @function verify
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DatumAxis.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.origin, long + 1);
                    if (error)
                        return "origin." + error;
                }
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.direction, long + 1);
                    if (error)
                        return "direction." + error;
                }
                return null;
            };

            /**
             * Creates a DatumAxis message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.DatumAxis} DatumAxis
             */
            DatumAxis.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.DatumAxis)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.DatumAxis: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.DatumAxis();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.origin != null) {
                    if (!$util.isObject(object.origin))
                        throw TypeError(".cadompart.v0_2.DatumAxis.origin: object expected");
                    message.origin = $root.cadompart.v0_2.Vec3.fromObject(object.origin, long + 1);
                }
                if (object.direction != null) {
                    if (!$util.isObject(object.direction))
                        throw TypeError(".cadompart.v0_2.DatumAxis.direction: object expected");
                    message.direction = $root.cadompart.v0_2.Vec3.fromObject(object.direction, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a DatumAxis message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {cadompart.v0_2.DatumAxis} message DatumAxis
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DatumAxis.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.origin = null;
                    object.direction = null;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                    object.origin = $root.cadompart.v0_2.Vec3.toObject(message.origin, options, q + 1);
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    object.direction = $root.cadompart.v0_2.Vec3.toObject(message.direction, options, q + 1);
                return object;
            };

            /**
             * Converts this DatumAxis to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.DatumAxis
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DatumAxis.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DatumAxis
             * @function getTypeUrl
             * @memberof cadompart.v0_2.DatumAxis
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DatumAxis.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.DatumAxis";
            };

            return DatumAxis;
        })();

        v0_2.DatumPoint = (function() {

            /**
             * Properties of a DatumPoint.
             * @memberof cadompart.v0_2
             * @interface IDatumPoint
             * @property {string|null} [id] DatumPoint id
             * @property {string|null} [name] DatumPoint name
             * @property {cadompart.v0_2.IVec3|null} [position] DatumPoint position
             */

            /**
             * Constructs a new DatumPoint.
             * @memberof cadompart.v0_2
             * @classdesc Represents a DatumPoint.
             * @implements IDatumPoint
             * @constructor
             * @param {cadompart.v0_2.IDatumPoint=} [properties] Properties to set
             */
            function DatumPoint(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DatumPoint id.
             * @member {string} id
             * @memberof cadompart.v0_2.DatumPoint
             * @instance
             */
            DatumPoint.prototype.id = "";

            /**
             * DatumPoint name.
             * @member {string} name
             * @memberof cadompart.v0_2.DatumPoint
             * @instance
             */
            DatumPoint.prototype.name = "";

            /**
             * DatumPoint position.
             * @member {cadompart.v0_2.IVec3|null|undefined} position
             * @memberof cadompart.v0_2.DatumPoint
             * @instance
             */
            DatumPoint.prototype.position = null;

            /**
             * Creates a new DatumPoint instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {cadompart.v0_2.IDatumPoint=} [properties] Properties to set
             * @returns {cadompart.v0_2.DatumPoint} DatumPoint instance
             */
            DatumPoint.create = function create(properties) {
                return new DatumPoint(properties);
            };

            /**
             * Encodes the specified DatumPoint message. Does not implicitly {@link cadompart.v0_2.DatumPoint.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {cadompart.v0_2.IDatumPoint} message DatumPoint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatumPoint.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.cadompart.v0_2.Vec3.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DatumPoint message, length delimited. Does not implicitly {@link cadompart.v0_2.DatumPoint.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {cadompart.v0_2.IDatumPoint} message DatumPoint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DatumPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a DatumPoint message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.DatumPoint} DatumPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatumPoint.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.DatumPoint();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.position = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a DatumPoint message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.DatumPoint} DatumPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DatumPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DatumPoint message.
             * @function verify
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DatumPoint.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.position != null && Object.hasOwnProperty.call(message, "position")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.position, long + 1);
                    if (error)
                        return "position." + error;
                }
                return null;
            };

            /**
             * Creates a DatumPoint message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.DatumPoint} DatumPoint
             */
            DatumPoint.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.DatumPoint)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.DatumPoint: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.DatumPoint();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.position != null) {
                    if (!$util.isObject(object.position))
                        throw TypeError(".cadompart.v0_2.DatumPoint.position: object expected");
                    message.position = $root.cadompart.v0_2.Vec3.fromObject(object.position, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a DatumPoint message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {cadompart.v0_2.DatumPoint} message DatumPoint
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DatumPoint.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.position = null;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    object.position = $root.cadompart.v0_2.Vec3.toObject(message.position, options, q + 1);
                return object;
            };

            /**
             * Converts this DatumPoint to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.DatumPoint
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DatumPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DatumPoint
             * @function getTypeUrl
             * @memberof cadompart.v0_2.DatumPoint
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DatumPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.DatumPoint";
            };

            return DatumPoint;
        })();

        v0_2.CoordinateSystem = (function() {

            /**
             * Properties of a CoordinateSystem.
             * @memberof cadompart.v0_2
             * @interface ICoordinateSystem
             * @property {string|null} [id] CoordinateSystem id
             * @property {string|null} [name] CoordinateSystem name
             * @property {cadompart.v0_2.IMat4|null} [transform] CoordinateSystem transform
             */

            /**
             * Constructs a new CoordinateSystem.
             * @memberof cadompart.v0_2
             * @classdesc Represents a CoordinateSystem.
             * @implements ICoordinateSystem
             * @constructor
             * @param {cadompart.v0_2.ICoordinateSystem=} [properties] Properties to set
             */
            function CoordinateSystem(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CoordinateSystem id.
             * @member {string} id
             * @memberof cadompart.v0_2.CoordinateSystem
             * @instance
             */
            CoordinateSystem.prototype.id = "";

            /**
             * CoordinateSystem name.
             * @member {string} name
             * @memberof cadompart.v0_2.CoordinateSystem
             * @instance
             */
            CoordinateSystem.prototype.name = "";

            /**
             * CoordinateSystem transform.
             * @member {cadompart.v0_2.IMat4|null|undefined} transform
             * @memberof cadompart.v0_2.CoordinateSystem
             * @instance
             */
            CoordinateSystem.prototype.transform = null;

            /**
             * Creates a new CoordinateSystem instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {cadompart.v0_2.ICoordinateSystem=} [properties] Properties to set
             * @returns {cadompart.v0_2.CoordinateSystem} CoordinateSystem instance
             */
            CoordinateSystem.create = function create(properties) {
                return new CoordinateSystem(properties);
            };

            /**
             * Encodes the specified CoordinateSystem message. Does not implicitly {@link cadompart.v0_2.CoordinateSystem.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {cadompart.v0_2.ICoordinateSystem} message CoordinateSystem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CoordinateSystem.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.transform != null && Object.hasOwnProperty.call(message, "transform"))
                    $root.cadompart.v0_2.Mat4.encode(message.transform, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified CoordinateSystem message, length delimited. Does not implicitly {@link cadompart.v0_2.CoordinateSystem.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {cadompart.v0_2.ICoordinateSystem} message CoordinateSystem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CoordinateSystem.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a CoordinateSystem message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.CoordinateSystem} CoordinateSystem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CoordinateSystem.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.CoordinateSystem();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.transform = $root.cadompart.v0_2.Mat4.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a CoordinateSystem message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.CoordinateSystem} CoordinateSystem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CoordinateSystem.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CoordinateSystem message.
             * @function verify
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CoordinateSystem.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.transform != null && Object.hasOwnProperty.call(message, "transform")) {
                    let error = $root.cadompart.v0_2.Mat4.verify(message.transform, long + 1);
                    if (error)
                        return "transform." + error;
                }
                return null;
            };

            /**
             * Creates a CoordinateSystem message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.CoordinateSystem} CoordinateSystem
             */
            CoordinateSystem.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.CoordinateSystem)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.CoordinateSystem: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.CoordinateSystem();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.transform != null) {
                    if (!$util.isObject(object.transform))
                        throw TypeError(".cadompart.v0_2.CoordinateSystem.transform: object expected");
                    message.transform = $root.cadompart.v0_2.Mat4.fromObject(object.transform, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a CoordinateSystem message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {cadompart.v0_2.CoordinateSystem} message CoordinateSystem
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CoordinateSystem.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.transform = null;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.transform != null && Object.hasOwnProperty.call(message, "transform"))
                    object.transform = $root.cadompart.v0_2.Mat4.toObject(message.transform, options, q + 1);
                return object;
            };

            /**
             * Converts this CoordinateSystem to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.CoordinateSystem
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CoordinateSystem.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CoordinateSystem
             * @function getTypeUrl
             * @memberof cadompart.v0_2.CoordinateSystem
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CoordinateSystem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.CoordinateSystem";
            };

            return CoordinateSystem;
        })();

        v0_2.SketchPointRef = (function() {

            /**
             * Properties of a SketchPointRef.
             * @memberof cadompart.v0_2
             * @interface ISketchPointRef
             * @property {cadompart.v0_2.SketchPointRefKind|null} [kind] SketchPointRef kind
             * @property {number|null} [curveIndex] SketchPointRef curveIndex
             * @property {cadompart.v0_2.IVec2|null} [explicitPoint] SketchPointRef explicitPoint
             */

            /**
             * Constructs a new SketchPointRef.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchPointRef.
             * @implements ISketchPointRef
             * @constructor
             * @param {cadompart.v0_2.ISketchPointRef=} [properties] Properties to set
             */
            function SketchPointRef(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchPointRef kind.
             * @member {cadompart.v0_2.SketchPointRefKind} kind
             * @memberof cadompart.v0_2.SketchPointRef
             * @instance
             */
            SketchPointRef.prototype.kind = 0;

            /**
             * SketchPointRef curveIndex.
             * @member {number} curveIndex
             * @memberof cadompart.v0_2.SketchPointRef
             * @instance
             */
            SketchPointRef.prototype.curveIndex = 0;

            /**
             * SketchPointRef explicitPoint.
             * @member {cadompart.v0_2.IVec2|null|undefined} explicitPoint
             * @memberof cadompart.v0_2.SketchPointRef
             * @instance
             */
            SketchPointRef.prototype.explicitPoint = null;

            /**
             * Creates a new SketchPointRef instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {cadompart.v0_2.ISketchPointRef=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchPointRef} SketchPointRef instance
             */
            SketchPointRef.create = function create(properties) {
                return new SketchPointRef(properties);
            };

            /**
             * Encodes the specified SketchPointRef message. Does not implicitly {@link cadompart.v0_2.SketchPointRef.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {cadompart.v0_2.ISketchPointRef} message SketchPointRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchPointRef.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.kind);
                if (message.curveIndex != null && Object.hasOwnProperty.call(message, "curveIndex"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.curveIndex);
                if (message.explicitPoint != null && Object.hasOwnProperty.call(message, "explicitPoint"))
                    $root.cadompart.v0_2.Vec2.encode(message.explicitPoint, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SketchPointRef message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchPointRef.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {cadompart.v0_2.ISketchPointRef} message SketchPointRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchPointRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchPointRef message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchPointRef} SketchPointRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchPointRef.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchPointRef();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.kind = reader.int32();
                            break;
                        }
                    case 2: {
                            message.curveIndex = reader.uint32();
                            break;
                        }
                    case 3: {
                            message.explicitPoint = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchPointRef message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchPointRef} SketchPointRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchPointRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchPointRef message.
             * @function verify
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchPointRef.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    switch (message.kind) {
                    default:
                        return "kind: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.curveIndex != null && Object.hasOwnProperty.call(message, "curveIndex"))
                    if (!$util.isInteger(message.curveIndex))
                        return "curveIndex: integer expected";
                if (message.explicitPoint != null && Object.hasOwnProperty.call(message, "explicitPoint")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.explicitPoint, long + 1);
                    if (error)
                        return "explicitPoint." + error;
                }
                return null;
            };

            /**
             * Creates a SketchPointRef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchPointRef} SketchPointRef
             */
            SketchPointRef.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchPointRef)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchPointRef: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchPointRef();
                switch (object.kind) {
                default:
                    if (typeof object.kind === "number") {
                        message.kind = object.kind;
                        break;
                    }
                    break;
                case "SKETCH_POINT_REF_UNSPECIFIED":
                case 0:
                    message.kind = 0;
                    break;
                case "SKETCH_POINT_REF_CURVE_START":
                case 1:
                    message.kind = 1;
                    break;
                case "SKETCH_POINT_REF_CURVE_END":
                case 2:
                    message.kind = 2;
                    break;
                case "SKETCH_POINT_REF_CURVE_CENTER":
                case 3:
                    message.kind = 3;
                    break;
                case "SKETCH_POINT_REF_EXPLICIT":
                case 4:
                    message.kind = 4;
                    break;
                }
                if (object.curveIndex != null)
                    message.curveIndex = object.curveIndex >>> 0;
                if (object.explicitPoint != null) {
                    if (!$util.isObject(object.explicitPoint))
                        throw TypeError(".cadompart.v0_2.SketchPointRef.explicitPoint: object expected");
                    message.explicitPoint = $root.cadompart.v0_2.Vec2.fromObject(object.explicitPoint, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a SketchPointRef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {cadompart.v0_2.SketchPointRef} message SketchPointRef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchPointRef.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.kind = options.enums === String ? "SKETCH_POINT_REF_UNSPECIFIED" : 0;
                    object.curveIndex = 0;
                    object.explicitPoint = null;
                }
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    object.kind = options.enums === String ? $root.cadompart.v0_2.SketchPointRefKind[message.kind] === undefined ? message.kind : $root.cadompart.v0_2.SketchPointRefKind[message.kind] : message.kind;
                if (message.curveIndex != null && Object.hasOwnProperty.call(message, "curveIndex"))
                    object.curveIndex = message.curveIndex;
                if (message.explicitPoint != null && Object.hasOwnProperty.call(message, "explicitPoint"))
                    object.explicitPoint = $root.cadompart.v0_2.Vec2.toObject(message.explicitPoint, options, q + 1);
                return object;
            };

            /**
             * Converts this SketchPointRef to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchPointRef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchPointRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchPointRef
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchPointRef
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchPointRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchPointRef";
            };

            return SketchPointRef;
        })();

        v0_2.SketchLine = (function() {

            /**
             * Properties of a SketchLine.
             * @memberof cadompart.v0_2
             * @interface ISketchLine
             * @property {string|null} [id] SketchLine id
             * @property {cadompart.v0_2.IVec2|null} [a] SketchLine a
             * @property {cadompart.v0_2.IVec2|null} [b] SketchLine b
             * @property {boolean|null} [construction] SketchLine construction
             */

            /**
             * Constructs a new SketchLine.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchLine.
             * @implements ISketchLine
             * @constructor
             * @param {cadompart.v0_2.ISketchLine=} [properties] Properties to set
             */
            function SketchLine(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchLine id.
             * @member {string} id
             * @memberof cadompart.v0_2.SketchLine
             * @instance
             */
            SketchLine.prototype.id = "";

            /**
             * SketchLine a.
             * @member {cadompart.v0_2.IVec2|null|undefined} a
             * @memberof cadompart.v0_2.SketchLine
             * @instance
             */
            SketchLine.prototype.a = null;

            /**
             * SketchLine b.
             * @member {cadompart.v0_2.IVec2|null|undefined} b
             * @memberof cadompart.v0_2.SketchLine
             * @instance
             */
            SketchLine.prototype.b = null;

            /**
             * SketchLine construction.
             * @member {boolean} construction
             * @memberof cadompart.v0_2.SketchLine
             * @instance
             */
            SketchLine.prototype.construction = false;

            /**
             * Creates a new SketchLine instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {cadompart.v0_2.ISketchLine=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchLine} SketchLine instance
             */
            SketchLine.create = function create(properties) {
                return new SketchLine(properties);
            };

            /**
             * Encodes the specified SketchLine message. Does not implicitly {@link cadompart.v0_2.SketchLine.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {cadompart.v0_2.ISketchLine} message SketchLine message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchLine.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                    $root.cadompart.v0_2.Vec2.encode(message.a, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                    $root.cadompart.v0_2.Vec2.encode(message.b, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.construction);
                return writer;
            };

            /**
             * Encodes the specified SketchLine message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchLine.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {cadompart.v0_2.ISketchLine} message SketchLine message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchLine.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchLine message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchLine} SketchLine
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchLine.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchLine();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.a = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.b = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.construction = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchLine message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchLine} SketchLine
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchLine.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchLine message.
             * @function verify
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchLine.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.a != null && Object.hasOwnProperty.call(message, "a")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.a, long + 1);
                    if (error)
                        return "a." + error;
                }
                if (message.b != null && Object.hasOwnProperty.call(message, "b")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.b, long + 1);
                    if (error)
                        return "b." + error;
                }
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    if (typeof message.construction !== "boolean")
                        return "construction: boolean expected";
                return null;
            };

            /**
             * Creates a SketchLine message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchLine} SketchLine
             */
            SketchLine.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchLine)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchLine: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchLine();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.a != null) {
                    if (!$util.isObject(object.a))
                        throw TypeError(".cadompart.v0_2.SketchLine.a: object expected");
                    message.a = $root.cadompart.v0_2.Vec2.fromObject(object.a, long + 1);
                }
                if (object.b != null) {
                    if (!$util.isObject(object.b))
                        throw TypeError(".cadompart.v0_2.SketchLine.b: object expected");
                    message.b = $root.cadompart.v0_2.Vec2.fromObject(object.b, long + 1);
                }
                if (object.construction != null)
                    message.construction = Boolean(object.construction);
                return message;
            };

            /**
             * Creates a plain object from a SketchLine message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {cadompart.v0_2.SketchLine} message SketchLine
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchLine.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.a = null;
                    object.b = null;
                    object.construction = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                    object.a = $root.cadompart.v0_2.Vec2.toObject(message.a, options, q + 1);
                if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                    object.b = $root.cadompart.v0_2.Vec2.toObject(message.b, options, q + 1);
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    object.construction = message.construction;
                return object;
            };

            /**
             * Converts this SketchLine to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchLine
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchLine.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchLine
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchLine
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchLine.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchLine";
            };

            return SketchLine;
        })();

        v0_2.SketchCircle = (function() {

            /**
             * Properties of a SketchCircle.
             * @memberof cadompart.v0_2
             * @interface ISketchCircle
             * @property {string|null} [id] SketchCircle id
             * @property {cadompart.v0_2.IVec2|null} [center] SketchCircle center
             * @property {number|null} [radius] SketchCircle radius
             * @property {boolean|null} [construction] SketchCircle construction
             */

            /**
             * Constructs a new SketchCircle.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchCircle.
             * @implements ISketchCircle
             * @constructor
             * @param {cadompart.v0_2.ISketchCircle=} [properties] Properties to set
             */
            function SketchCircle(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchCircle id.
             * @member {string} id
             * @memberof cadompart.v0_2.SketchCircle
             * @instance
             */
            SketchCircle.prototype.id = "";

            /**
             * SketchCircle center.
             * @member {cadompart.v0_2.IVec2|null|undefined} center
             * @memberof cadompart.v0_2.SketchCircle
             * @instance
             */
            SketchCircle.prototype.center = null;

            /**
             * SketchCircle radius.
             * @member {number} radius
             * @memberof cadompart.v0_2.SketchCircle
             * @instance
             */
            SketchCircle.prototype.radius = 0;

            /**
             * SketchCircle construction.
             * @member {boolean} construction
             * @memberof cadompart.v0_2.SketchCircle
             * @instance
             */
            SketchCircle.prototype.construction = false;

            /**
             * Creates a new SketchCircle instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {cadompart.v0_2.ISketchCircle=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchCircle} SketchCircle instance
             */
            SketchCircle.create = function create(properties) {
                return new SketchCircle(properties);
            };

            /**
             * Encodes the specified SketchCircle message. Does not implicitly {@link cadompart.v0_2.SketchCircle.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {cadompart.v0_2.ISketchCircle} message SketchCircle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchCircle.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.center != null && Object.hasOwnProperty.call(message, "center"))
                    $root.cadompart.v0_2.Vec2.encode(message.center, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.radius);
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.construction);
                return writer;
            };

            /**
             * Encodes the specified SketchCircle message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchCircle.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {cadompart.v0_2.ISketchCircle} message SketchCircle message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchCircle.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchCircle message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchCircle} SketchCircle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchCircle.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchCircle();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.center = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.radius = reader.double();
                            break;
                        }
                    case 4: {
                            message.construction = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchCircle message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchCircle} SketchCircle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchCircle.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchCircle message.
             * @function verify
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchCircle.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.center != null && Object.hasOwnProperty.call(message, "center")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.center, long + 1);
                    if (error)
                        return "center." + error;
                }
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    if (typeof message.radius !== "number")
                        return "radius: number expected";
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    if (typeof message.construction !== "boolean")
                        return "construction: boolean expected";
                return null;
            };

            /**
             * Creates a SketchCircle message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchCircle} SketchCircle
             */
            SketchCircle.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchCircle)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchCircle: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchCircle();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.center != null) {
                    if (!$util.isObject(object.center))
                        throw TypeError(".cadompart.v0_2.SketchCircle.center: object expected");
                    message.center = $root.cadompart.v0_2.Vec2.fromObject(object.center, long + 1);
                }
                if (object.radius != null)
                    message.radius = Number(object.radius);
                if (object.construction != null)
                    message.construction = Boolean(object.construction);
                return message;
            };

            /**
             * Creates a plain object from a SketchCircle message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {cadompart.v0_2.SketchCircle} message SketchCircle
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchCircle.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.center = null;
                    object.radius = 0;
                    object.construction = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.center != null && Object.hasOwnProperty.call(message, "center"))
                    object.center = $root.cadompart.v0_2.Vec2.toObject(message.center, options, q + 1);
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    object.construction = message.construction;
                return object;
            };

            /**
             * Converts this SketchCircle to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchCircle
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchCircle.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchCircle
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchCircle
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchCircle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchCircle";
            };

            return SketchCircle;
        })();

        v0_2.SketchArc = (function() {

            /**
             * Properties of a SketchArc.
             * @memberof cadompart.v0_2
             * @interface ISketchArc
             * @property {string|null} [id] SketchArc id
             * @property {cadompart.v0_2.IVec2|null} [center] SketchArc center
             * @property {number|null} [radius] SketchArc radius
             * @property {number|null} [startAngleRad] SketchArc startAngleRad
             * @property {number|null} [endAngleRad] SketchArc endAngleRad
             * @property {boolean|null} [construction] SketchArc construction
             */

            /**
             * Constructs a new SketchArc.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchArc.
             * @implements ISketchArc
             * @constructor
             * @param {cadompart.v0_2.ISketchArc=} [properties] Properties to set
             */
            function SketchArc(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchArc id.
             * @member {string} id
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             */
            SketchArc.prototype.id = "";

            /**
             * SketchArc center.
             * @member {cadompart.v0_2.IVec2|null|undefined} center
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             */
            SketchArc.prototype.center = null;

            /**
             * SketchArc radius.
             * @member {number} radius
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             */
            SketchArc.prototype.radius = 0;

            /**
             * SketchArc startAngleRad.
             * @member {number} startAngleRad
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             */
            SketchArc.prototype.startAngleRad = 0;

            /**
             * SketchArc endAngleRad.
             * @member {number} endAngleRad
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             */
            SketchArc.prototype.endAngleRad = 0;

            /**
             * SketchArc construction.
             * @member {boolean} construction
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             */
            SketchArc.prototype.construction = false;

            /**
             * Creates a new SketchArc instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {cadompart.v0_2.ISketchArc=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchArc} SketchArc instance
             */
            SketchArc.create = function create(properties) {
                return new SketchArc(properties);
            };

            /**
             * Encodes the specified SketchArc message. Does not implicitly {@link cadompart.v0_2.SketchArc.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {cadompart.v0_2.ISketchArc} message SketchArc message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchArc.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.center != null && Object.hasOwnProperty.call(message, "center"))
                    $root.cadompart.v0_2.Vec2.encode(message.center, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.radius);
                if (message.startAngleRad != null && Object.hasOwnProperty.call(message, "startAngleRad"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.startAngleRad);
                if (message.endAngleRad != null && Object.hasOwnProperty.call(message, "endAngleRad"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.endAngleRad);
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.construction);
                return writer;
            };

            /**
             * Encodes the specified SketchArc message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchArc.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {cadompart.v0_2.ISketchArc} message SketchArc message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchArc.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchArc message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchArc} SketchArc
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchArc.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchArc();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.center = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.radius = reader.double();
                            break;
                        }
                    case 4: {
                            message.startAngleRad = reader.double();
                            break;
                        }
                    case 5: {
                            message.endAngleRad = reader.double();
                            break;
                        }
                    case 6: {
                            message.construction = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchArc message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchArc} SketchArc
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchArc.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchArc message.
             * @function verify
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchArc.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.center != null && Object.hasOwnProperty.call(message, "center")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.center, long + 1);
                    if (error)
                        return "center." + error;
                }
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    if (typeof message.radius !== "number")
                        return "radius: number expected";
                if (message.startAngleRad != null && Object.hasOwnProperty.call(message, "startAngleRad"))
                    if (typeof message.startAngleRad !== "number")
                        return "startAngleRad: number expected";
                if (message.endAngleRad != null && Object.hasOwnProperty.call(message, "endAngleRad"))
                    if (typeof message.endAngleRad !== "number")
                        return "endAngleRad: number expected";
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    if (typeof message.construction !== "boolean")
                        return "construction: boolean expected";
                return null;
            };

            /**
             * Creates a SketchArc message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchArc} SketchArc
             */
            SketchArc.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchArc)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchArc: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchArc();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.center != null) {
                    if (!$util.isObject(object.center))
                        throw TypeError(".cadompart.v0_2.SketchArc.center: object expected");
                    message.center = $root.cadompart.v0_2.Vec2.fromObject(object.center, long + 1);
                }
                if (object.radius != null)
                    message.radius = Number(object.radius);
                if (object.startAngleRad != null)
                    message.startAngleRad = Number(object.startAngleRad);
                if (object.endAngleRad != null)
                    message.endAngleRad = Number(object.endAngleRad);
                if (object.construction != null)
                    message.construction = Boolean(object.construction);
                return message;
            };

            /**
             * Creates a plain object from a SketchArc message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {cadompart.v0_2.SketchArc} message SketchArc
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchArc.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.center = null;
                    object.radius = 0;
                    object.startAngleRad = 0;
                    object.endAngleRad = 0;
                    object.construction = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.center != null && Object.hasOwnProperty.call(message, "center"))
                    object.center = $root.cadompart.v0_2.Vec2.toObject(message.center, options, q + 1);
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
                if (message.startAngleRad != null && Object.hasOwnProperty.call(message, "startAngleRad"))
                    object.startAngleRad = options.json && !isFinite(message.startAngleRad) ? String(message.startAngleRad) : message.startAngleRad;
                if (message.endAngleRad != null && Object.hasOwnProperty.call(message, "endAngleRad"))
                    object.endAngleRad = options.json && !isFinite(message.endAngleRad) ? String(message.endAngleRad) : message.endAngleRad;
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    object.construction = message.construction;
                return object;
            };

            /**
             * Converts this SketchArc to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchArc
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchArc.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchArc
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchArc
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchArc.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchArc";
            };

            return SketchArc;
        })();

        v0_2.SketchEllipse = (function() {

            /**
             * Properties of a SketchEllipse.
             * @memberof cadompart.v0_2
             * @interface ISketchEllipse
             * @property {string|null} [id] SketchEllipse id
             * @property {cadompart.v0_2.IVec2|null} [center] SketchEllipse center
             * @property {cadompart.v0_2.IVec2|null} [majorAxis] SketchEllipse majorAxis
             * @property {number|null} [minorRadius] SketchEllipse minorRadius
             * @property {boolean|null} [construction] SketchEllipse construction
             */

            /**
             * Constructs a new SketchEllipse.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchEllipse.
             * @implements ISketchEllipse
             * @constructor
             * @param {cadompart.v0_2.ISketchEllipse=} [properties] Properties to set
             */
            function SketchEllipse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchEllipse id.
             * @member {string} id
             * @memberof cadompart.v0_2.SketchEllipse
             * @instance
             */
            SketchEllipse.prototype.id = "";

            /**
             * SketchEllipse center.
             * @member {cadompart.v0_2.IVec2|null|undefined} center
             * @memberof cadompart.v0_2.SketchEllipse
             * @instance
             */
            SketchEllipse.prototype.center = null;

            /**
             * SketchEllipse majorAxis.
             * @member {cadompart.v0_2.IVec2|null|undefined} majorAxis
             * @memberof cadompart.v0_2.SketchEllipse
             * @instance
             */
            SketchEllipse.prototype.majorAxis = null;

            /**
             * SketchEllipse minorRadius.
             * @member {number} minorRadius
             * @memberof cadompart.v0_2.SketchEllipse
             * @instance
             */
            SketchEllipse.prototype.minorRadius = 0;

            /**
             * SketchEllipse construction.
             * @member {boolean} construction
             * @memberof cadompart.v0_2.SketchEllipse
             * @instance
             */
            SketchEllipse.prototype.construction = false;

            /**
             * Creates a new SketchEllipse instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {cadompart.v0_2.ISketchEllipse=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchEllipse} SketchEllipse instance
             */
            SketchEllipse.create = function create(properties) {
                return new SketchEllipse(properties);
            };

            /**
             * Encodes the specified SketchEllipse message. Does not implicitly {@link cadompart.v0_2.SketchEllipse.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {cadompart.v0_2.ISketchEllipse} message SketchEllipse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchEllipse.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.center != null && Object.hasOwnProperty.call(message, "center"))
                    $root.cadompart.v0_2.Vec2.encode(message.center, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.majorAxis != null && Object.hasOwnProperty.call(message, "majorAxis"))
                    $root.cadompart.v0_2.Vec2.encode(message.majorAxis, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.minorRadius != null && Object.hasOwnProperty.call(message, "minorRadius"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.minorRadius);
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.construction);
                return writer;
            };

            /**
             * Encodes the specified SketchEllipse message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchEllipse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {cadompart.v0_2.ISketchEllipse} message SketchEllipse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchEllipse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchEllipse message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchEllipse} SketchEllipse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchEllipse.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchEllipse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.center = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.majorAxis = $root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.minorRadius = reader.double();
                            break;
                        }
                    case 5: {
                            message.construction = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchEllipse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchEllipse} SketchEllipse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchEllipse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchEllipse message.
             * @function verify
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchEllipse.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.center != null && Object.hasOwnProperty.call(message, "center")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.center, long + 1);
                    if (error)
                        return "center." + error;
                }
                if (message.majorAxis != null && Object.hasOwnProperty.call(message, "majorAxis")) {
                    let error = $root.cadompart.v0_2.Vec2.verify(message.majorAxis, long + 1);
                    if (error)
                        return "majorAxis." + error;
                }
                if (message.minorRadius != null && Object.hasOwnProperty.call(message, "minorRadius"))
                    if (typeof message.minorRadius !== "number")
                        return "minorRadius: number expected";
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    if (typeof message.construction !== "boolean")
                        return "construction: boolean expected";
                return null;
            };

            /**
             * Creates a SketchEllipse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchEllipse} SketchEllipse
             */
            SketchEllipse.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchEllipse)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchEllipse: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchEllipse();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.center != null) {
                    if (!$util.isObject(object.center))
                        throw TypeError(".cadompart.v0_2.SketchEllipse.center: object expected");
                    message.center = $root.cadompart.v0_2.Vec2.fromObject(object.center, long + 1);
                }
                if (object.majorAxis != null) {
                    if (!$util.isObject(object.majorAxis))
                        throw TypeError(".cadompart.v0_2.SketchEllipse.majorAxis: object expected");
                    message.majorAxis = $root.cadompart.v0_2.Vec2.fromObject(object.majorAxis, long + 1);
                }
                if (object.minorRadius != null)
                    message.minorRadius = Number(object.minorRadius);
                if (object.construction != null)
                    message.construction = Boolean(object.construction);
                return message;
            };

            /**
             * Creates a plain object from a SketchEllipse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {cadompart.v0_2.SketchEllipse} message SketchEllipse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchEllipse.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.center = null;
                    object.majorAxis = null;
                    object.minorRadius = 0;
                    object.construction = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.center != null && Object.hasOwnProperty.call(message, "center"))
                    object.center = $root.cadompart.v0_2.Vec2.toObject(message.center, options, q + 1);
                if (message.majorAxis != null && Object.hasOwnProperty.call(message, "majorAxis"))
                    object.majorAxis = $root.cadompart.v0_2.Vec2.toObject(message.majorAxis, options, q + 1);
                if (message.minorRadius != null && Object.hasOwnProperty.call(message, "minorRadius"))
                    object.minorRadius = options.json && !isFinite(message.minorRadius) ? String(message.minorRadius) : message.minorRadius;
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    object.construction = message.construction;
                return object;
            };

            /**
             * Converts this SketchEllipse to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchEllipse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchEllipse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchEllipse
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchEllipse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchEllipse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchEllipse";
            };

            return SketchEllipse;
        })();

        v0_2.SketchSpline = (function() {

            /**
             * Properties of a SketchSpline.
             * @memberof cadompart.v0_2
             * @interface ISketchSpline
             * @property {string|null} [id] SketchSpline id
             * @property {Array.<cadompart.v0_2.IVec2>|null} [poles] SketchSpline poles
             * @property {Array.<number>|null} [knots] SketchSpline knots
             * @property {number|null} [degree] SketchSpline degree
             * @property {boolean|null} [closed] SketchSpline closed
             * @property {boolean|null} [construction] SketchSpline construction
             */

            /**
             * Constructs a new SketchSpline.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchSpline.
             * @implements ISketchSpline
             * @constructor
             * @param {cadompart.v0_2.ISketchSpline=} [properties] Properties to set
             */
            function SketchSpline(properties) {
                this.poles = [];
                this.knots = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchSpline id.
             * @member {string} id
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             */
            SketchSpline.prototype.id = "";

            /**
             * SketchSpline poles.
             * @member {Array.<cadompart.v0_2.IVec2>} poles
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             */
            SketchSpline.prototype.poles = $util.emptyArray;

            /**
             * SketchSpline knots.
             * @member {Array.<number>} knots
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             */
            SketchSpline.prototype.knots = $util.emptyArray;

            /**
             * SketchSpline degree.
             * @member {number} degree
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             */
            SketchSpline.prototype.degree = 0;

            /**
             * SketchSpline closed.
             * @member {boolean} closed
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             */
            SketchSpline.prototype.closed = false;

            /**
             * SketchSpline construction.
             * @member {boolean} construction
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             */
            SketchSpline.prototype.construction = false;

            /**
             * Creates a new SketchSpline instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {cadompart.v0_2.ISketchSpline=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchSpline} SketchSpline instance
             */
            SketchSpline.create = function create(properties) {
                return new SketchSpline(properties);
            };

            /**
             * Encodes the specified SketchSpline message. Does not implicitly {@link cadompart.v0_2.SketchSpline.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {cadompart.v0_2.ISketchSpline} message SketchSpline message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchSpline.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.poles != null && message.poles.length)
                    for (let i = 0; i < message.poles.length; ++i)
                        $root.cadompart.v0_2.Vec2.encode(message.poles[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.knots != null && message.knots.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (let i = 0; i < message.knots.length; ++i)
                        writer.double(message.knots[i]);
                    writer.ldelim();
                }
                if (message.degree != null && Object.hasOwnProperty.call(message, "degree"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.degree);
                if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.closed);
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.construction);
                return writer;
            };

            /**
             * Encodes the specified SketchSpline message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchSpline.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {cadompart.v0_2.ISketchSpline} message SketchSpline message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchSpline.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchSpline message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchSpline} SketchSpline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchSpline.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchSpline();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.poles && message.poles.length))
                                message.poles = [];
                            message.poles.push($root.cadompart.v0_2.Vec2.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 3: {
                            if (!(message.knots && message.knots.length))
                                message.knots = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                if (end2 > reader.len)
                                    throw RangeError("index out of range");
                                reader.len = end2;
                                while (reader.pos < end2)
                                    message.knots.push(reader.double());
                                if (reader.pos !== end2)
                                    throw RangeError("index out of range");
                                reader.len = end;
                            } else
                                message.knots.push(reader.double());
                            break;
                        }
                    case 4: {
                            message.degree = reader.uint32();
                            break;
                        }
                    case 5: {
                            message.closed = reader.bool();
                            break;
                        }
                    case 6: {
                            message.construction = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchSpline message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchSpline} SketchSpline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchSpline.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchSpline message.
             * @function verify
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchSpline.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.poles != null && Object.hasOwnProperty.call(message, "poles")) {
                    if (!Array.isArray(message.poles))
                        return "poles: array expected";
                    for (let i = 0; i < message.poles.length; ++i) {
                        let error = $root.cadompart.v0_2.Vec2.verify(message.poles[i], long + 1);
                        if (error)
                            return "poles." + error;
                    }
                }
                if (message.knots != null && Object.hasOwnProperty.call(message, "knots")) {
                    if (!Array.isArray(message.knots))
                        return "knots: array expected";
                    for (let i = 0; i < message.knots.length; ++i)
                        if (typeof message.knots[i] !== "number")
                            return "knots: number[] expected";
                }
                if (message.degree != null && Object.hasOwnProperty.call(message, "degree"))
                    if (!$util.isInteger(message.degree))
                        return "degree: integer expected";
                if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
                    if (typeof message.closed !== "boolean")
                        return "closed: boolean expected";
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    if (typeof message.construction !== "boolean")
                        return "construction: boolean expected";
                return null;
            };

            /**
             * Creates a SketchSpline message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchSpline} SketchSpline
             */
            SketchSpline.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchSpline)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchSpline: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchSpline();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.poles) {
                    if (!Array.isArray(object.poles))
                        throw TypeError(".cadompart.v0_2.SketchSpline.poles: array expected");
                    message.poles = [];
                    for (let i = 0; i < object.poles.length; ++i) {
                        if (!$util.isObject(object.poles[i]))
                            throw TypeError(".cadompart.v0_2.SketchSpline.poles: object expected");
                        message.poles[i] = $root.cadompart.v0_2.Vec2.fromObject(object.poles[i], long + 1);
                    }
                }
                if (object.knots) {
                    if (!Array.isArray(object.knots))
                        throw TypeError(".cadompart.v0_2.SketchSpline.knots: array expected");
                    message.knots = [];
                    for (let i = 0; i < object.knots.length; ++i)
                        message.knots[i] = Number(object.knots[i]);
                }
                if (object.degree != null)
                    message.degree = object.degree >>> 0;
                if (object.closed != null)
                    message.closed = Boolean(object.closed);
                if (object.construction != null)
                    message.construction = Boolean(object.construction);
                return message;
            };

            /**
             * Creates a plain object from a SketchSpline message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {cadompart.v0_2.SketchSpline} message SketchSpline
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchSpline.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.poles = [];
                    object.knots = [];
                }
                if (options.defaults) {
                    object.id = "";
                    object.degree = 0;
                    object.closed = false;
                    object.construction = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.poles && message.poles.length) {
                    object.poles = [];
                    for (let j = 0; j < message.poles.length; ++j)
                        object.poles[j] = $root.cadompart.v0_2.Vec2.toObject(message.poles[j], options, q + 1);
                }
                if (message.knots && message.knots.length) {
                    object.knots = [];
                    for (let j = 0; j < message.knots.length; ++j)
                        object.knots[j] = options.json && !isFinite(message.knots[j]) ? String(message.knots[j]) : message.knots[j];
                }
                if (message.degree != null && Object.hasOwnProperty.call(message, "degree"))
                    object.degree = message.degree;
                if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
                    object.closed = message.closed;
                if (message.construction != null && Object.hasOwnProperty.call(message, "construction"))
                    object.construction = message.construction;
                return object;
            };

            /**
             * Converts this SketchSpline to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchSpline
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchSpline.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchSpline
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchSpline
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchSpline.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchSpline";
            };

            return SketchSpline;
        })();

        v0_2.SketchCurve = (function() {

            /**
             * Properties of a SketchCurve.
             * @memberof cadompart.v0_2
             * @interface ISketchCurve
             * @property {cadompart.v0_2.ISketchLine|null} [line] SketchCurve line
             * @property {cadompart.v0_2.ISketchCircle|null} [circle] SketchCurve circle
             * @property {cadompart.v0_2.ISketchArc|null} [arc] SketchCurve arc
             * @property {cadompart.v0_2.ISketchEllipse|null} [ellipse] SketchCurve ellipse
             * @property {cadompart.v0_2.ISketchSpline|null} [spline] SketchCurve spline
             */

            /**
             * Constructs a new SketchCurve.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchCurve.
             * @implements ISketchCurve
             * @constructor
             * @param {cadompart.v0_2.ISketchCurve=} [properties] Properties to set
             */
            function SketchCurve(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchCurve line.
             * @member {cadompart.v0_2.ISketchLine|null|undefined} line
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             */
            SketchCurve.prototype.line = null;

            /**
             * SketchCurve circle.
             * @member {cadompart.v0_2.ISketchCircle|null|undefined} circle
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             */
            SketchCurve.prototype.circle = null;

            /**
             * SketchCurve arc.
             * @member {cadompart.v0_2.ISketchArc|null|undefined} arc
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             */
            SketchCurve.prototype.arc = null;

            /**
             * SketchCurve ellipse.
             * @member {cadompart.v0_2.ISketchEllipse|null|undefined} ellipse
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             */
            SketchCurve.prototype.ellipse = null;

            /**
             * SketchCurve spline.
             * @member {cadompart.v0_2.ISketchSpline|null|undefined} spline
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             */
            SketchCurve.prototype.spline = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * SketchCurve curve.
             * @member {"line"|"circle"|"arc"|"ellipse"|"spline"|undefined} curve
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             */
            Object.defineProperty(SketchCurve.prototype, "curve", {
                get: $util.oneOfGetter($oneOfFields = ["line", "circle", "arc", "ellipse", "spline"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new SketchCurve instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {cadompart.v0_2.ISketchCurve=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchCurve} SketchCurve instance
             */
            SketchCurve.create = function create(properties) {
                return new SketchCurve(properties);
            };

            /**
             * Encodes the specified SketchCurve message. Does not implicitly {@link cadompart.v0_2.SketchCurve.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {cadompart.v0_2.ISketchCurve} message SketchCurve message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchCurve.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.line != null && Object.hasOwnProperty.call(message, "line"))
                    $root.cadompart.v0_2.SketchLine.encode(message.line, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.circle != null && Object.hasOwnProperty.call(message, "circle"))
                    $root.cadompart.v0_2.SketchCircle.encode(message.circle, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.arc != null && Object.hasOwnProperty.call(message, "arc"))
                    $root.cadompart.v0_2.SketchArc.encode(message.arc, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.ellipse != null && Object.hasOwnProperty.call(message, "ellipse"))
                    $root.cadompart.v0_2.SketchEllipse.encode(message.ellipse, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                if (message.spline != null && Object.hasOwnProperty.call(message, "spline"))
                    $root.cadompart.v0_2.SketchSpline.encode(message.spline, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SketchCurve message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchCurve.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {cadompart.v0_2.ISketchCurve} message SketchCurve message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchCurve.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchCurve message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchCurve} SketchCurve
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchCurve.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchCurve();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.line = $root.cadompart.v0_2.SketchLine.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 2: {
                            message.circle = $root.cadompart.v0_2.SketchCircle.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.arc = $root.cadompart.v0_2.SketchArc.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.ellipse = $root.cadompart.v0_2.SketchEllipse.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 5: {
                            message.spline = $root.cadompart.v0_2.SketchSpline.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchCurve message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchCurve} SketchCurve
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchCurve.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchCurve message.
             * @function verify
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchCurve.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.line != null && Object.hasOwnProperty.call(message, "line")) {
                    properties.curve = 1;
                    {
                        let error = $root.cadompart.v0_2.SketchLine.verify(message.line, long + 1);
                        if (error)
                            return "line." + error;
                    }
                }
                if (message.circle != null && Object.hasOwnProperty.call(message, "circle")) {
                    if (properties.curve === 1)
                        return "curve: multiple values";
                    properties.curve = 1;
                    {
                        let error = $root.cadompart.v0_2.SketchCircle.verify(message.circle, long + 1);
                        if (error)
                            return "circle." + error;
                    }
                }
                if (message.arc != null && Object.hasOwnProperty.call(message, "arc")) {
                    if (properties.curve === 1)
                        return "curve: multiple values";
                    properties.curve = 1;
                    {
                        let error = $root.cadompart.v0_2.SketchArc.verify(message.arc, long + 1);
                        if (error)
                            return "arc." + error;
                    }
                }
                if (message.ellipse != null && Object.hasOwnProperty.call(message, "ellipse")) {
                    if (properties.curve === 1)
                        return "curve: multiple values";
                    properties.curve = 1;
                    {
                        let error = $root.cadompart.v0_2.SketchEllipse.verify(message.ellipse, long + 1);
                        if (error)
                            return "ellipse." + error;
                    }
                }
                if (message.spline != null && Object.hasOwnProperty.call(message, "spline")) {
                    if (properties.curve === 1)
                        return "curve: multiple values";
                    properties.curve = 1;
                    {
                        let error = $root.cadompart.v0_2.SketchSpline.verify(message.spline, long + 1);
                        if (error)
                            return "spline." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a SketchCurve message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchCurve} SketchCurve
             */
            SketchCurve.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchCurve)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchCurve: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchCurve();
                if (object.line != null) {
                    if (!$util.isObject(object.line))
                        throw TypeError(".cadompart.v0_2.SketchCurve.line: object expected");
                    message.line = $root.cadompart.v0_2.SketchLine.fromObject(object.line, long + 1);
                }
                if (object.circle != null) {
                    if (!$util.isObject(object.circle))
                        throw TypeError(".cadompart.v0_2.SketchCurve.circle: object expected");
                    message.circle = $root.cadompart.v0_2.SketchCircle.fromObject(object.circle, long + 1);
                }
                if (object.arc != null) {
                    if (!$util.isObject(object.arc))
                        throw TypeError(".cadompart.v0_2.SketchCurve.arc: object expected");
                    message.arc = $root.cadompart.v0_2.SketchArc.fromObject(object.arc, long + 1);
                }
                if (object.ellipse != null) {
                    if (!$util.isObject(object.ellipse))
                        throw TypeError(".cadompart.v0_2.SketchCurve.ellipse: object expected");
                    message.ellipse = $root.cadompart.v0_2.SketchEllipse.fromObject(object.ellipse, long + 1);
                }
                if (object.spline != null) {
                    if (!$util.isObject(object.spline))
                        throw TypeError(".cadompart.v0_2.SketchCurve.spline: object expected");
                    message.spline = $root.cadompart.v0_2.SketchSpline.fromObject(object.spline, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a SketchCurve message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {cadompart.v0_2.SketchCurve} message SketchCurve
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchCurve.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (message.line != null && Object.hasOwnProperty.call(message, "line")) {
                    object.line = $root.cadompart.v0_2.SketchLine.toObject(message.line, options, q + 1);
                    if (options.oneofs)
                        object.curve = "line";
                }
                if (message.circle != null && Object.hasOwnProperty.call(message, "circle")) {
                    object.circle = $root.cadompart.v0_2.SketchCircle.toObject(message.circle, options, q + 1);
                    if (options.oneofs)
                        object.curve = "circle";
                }
                if (message.arc != null && Object.hasOwnProperty.call(message, "arc")) {
                    object.arc = $root.cadompart.v0_2.SketchArc.toObject(message.arc, options, q + 1);
                    if (options.oneofs)
                        object.curve = "arc";
                }
                if (message.ellipse != null && Object.hasOwnProperty.call(message, "ellipse")) {
                    object.ellipse = $root.cadompart.v0_2.SketchEllipse.toObject(message.ellipse, options, q + 1);
                    if (options.oneofs)
                        object.curve = "ellipse";
                }
                if (message.spline != null && Object.hasOwnProperty.call(message, "spline")) {
                    object.spline = $root.cadompart.v0_2.SketchSpline.toObject(message.spline, options, q + 1);
                    if (options.oneofs)
                        object.curve = "spline";
                }
                return object;
            };

            /**
             * Converts this SketchCurve to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchCurve
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchCurve.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchCurve
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchCurve
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchCurve.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchCurve";
            };

            return SketchCurve;
        })();

        v0_2.SketchConstraint = (function() {

            /**
             * Properties of a SketchConstraint.
             * @memberof cadompart.v0_2
             * @interface ISketchConstraint
             * @property {string|null} [id] SketchConstraint id
             * @property {cadompart.v0_2.SketchConstraintKind|null} [kind] SketchConstraint kind
             * @property {Array.<number>|null} [curveIndices] SketchConstraint curveIndices
             * @property {Array.<cadompart.v0_2.ISketchPointRef>|null} [points] SketchConstraint points
             * @property {number|null} [value] SketchConstraint value
             * @property {string|null} [parameterId] SketchConstraint parameterId
             * @property {string|null} [mirrorLineCurveId] SketchConstraint mirrorLineCurveId
             */

            /**
             * Constructs a new SketchConstraint.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchConstraint.
             * @implements ISketchConstraint
             * @constructor
             * @param {cadompart.v0_2.ISketchConstraint=} [properties] Properties to set
             */
            function SketchConstraint(properties) {
                this.curveIndices = [];
                this.points = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchConstraint id.
             * @member {string} id
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.id = "";

            /**
             * SketchConstraint kind.
             * @member {cadompart.v0_2.SketchConstraintKind} kind
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.kind = 0;

            /**
             * SketchConstraint curveIndices.
             * @member {Array.<number>} curveIndices
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.curveIndices = $util.emptyArray;

            /**
             * SketchConstraint points.
             * @member {Array.<cadompart.v0_2.ISketchPointRef>} points
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.points = $util.emptyArray;

            /**
             * SketchConstraint value.
             * @member {number|null|undefined} value
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.value = null;

            /**
             * SketchConstraint parameterId.
             * @member {string} parameterId
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.parameterId = "";

            /**
             * SketchConstraint mirrorLineCurveId.
             * @member {string} mirrorLineCurveId
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             */
            SketchConstraint.prototype.mirrorLineCurveId = "";

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(SketchConstraint.prototype, "_value", {
                get: $util.oneOfGetter($oneOfFields = ["value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new SketchConstraint instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {cadompart.v0_2.ISketchConstraint=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchConstraint} SketchConstraint instance
             */
            SketchConstraint.create = function create(properties) {
                return new SketchConstraint(properties);
            };

            /**
             * Encodes the specified SketchConstraint message. Does not implicitly {@link cadompart.v0_2.SketchConstraint.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {cadompart.v0_2.ISketchConstraint} message SketchConstraint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchConstraint.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.kind);
                if (message.curveIndices != null && message.curveIndices.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (let i = 0; i < message.curveIndices.length; ++i)
                        writer.uint32(message.curveIndices[i]);
                    writer.ldelim();
                }
                if (message.points != null && message.points.length)
                    for (let i = 0; i < message.points.length; ++i)
                        $root.cadompart.v0_2.SketchPointRef.encode(message.points[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.value);
                if (message.parameterId != null && Object.hasOwnProperty.call(message, "parameterId"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.parameterId);
                if (message.mirrorLineCurveId != null && Object.hasOwnProperty.call(message, "mirrorLineCurveId"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.mirrorLineCurveId);
                return writer;
            };

            /**
             * Encodes the specified SketchConstraint message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchConstraint.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {cadompart.v0_2.ISketchConstraint} message SketchConstraint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchConstraint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchConstraint message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchConstraint} SketchConstraint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchConstraint.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchConstraint();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.kind = reader.int32();
                            break;
                        }
                    case 3: {
                            if (!(message.curveIndices && message.curveIndices.length))
                                message.curveIndices = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                if (end2 > reader.len)
                                    throw RangeError("index out of range");
                                reader.len = end2;
                                while (reader.pos < end2)
                                    message.curveIndices.push(reader.uint32());
                                if (reader.pos !== end2)
                                    throw RangeError("index out of range");
                                reader.len = end;
                            } else
                                message.curveIndices.push(reader.uint32());
                            break;
                        }
                    case 4: {
                            if (!(message.points && message.points.length))
                                message.points = [];
                            message.points.push($root.cadompart.v0_2.SketchPointRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 5: {
                            message.value = reader.double();
                            break;
                        }
                    case 6: {
                            message.parameterId = reader.string();
                            break;
                        }
                    case 7: {
                            message.mirrorLineCurveId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchConstraint message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchConstraint} SketchConstraint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchConstraint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchConstraint message.
             * @function verify
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchConstraint.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    switch (message.kind) {
                    default:
                        return "kind: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                        break;
                    }
                if (message.curveIndices != null && Object.hasOwnProperty.call(message, "curveIndices")) {
                    if (!Array.isArray(message.curveIndices))
                        return "curveIndices: array expected";
                    for (let i = 0; i < message.curveIndices.length; ++i)
                        if (!$util.isInteger(message.curveIndices[i]))
                            return "curveIndices: integer[] expected";
                }
                if (message.points != null && Object.hasOwnProperty.call(message, "points")) {
                    if (!Array.isArray(message.points))
                        return "points: array expected";
                    for (let i = 0; i < message.points.length; ++i) {
                        let error = $root.cadompart.v0_2.SketchPointRef.verify(message.points[i], long + 1);
                        if (error)
                            return "points." + error;
                    }
                }
                if (message.value != null && Object.hasOwnProperty.call(message, "value")) {
                    properties._value = 1;
                    if (typeof message.value !== "number")
                        return "value: number expected";
                }
                if (message.parameterId != null && Object.hasOwnProperty.call(message, "parameterId"))
                    if (!$util.isString(message.parameterId))
                        return "parameterId: string expected";
                if (message.mirrorLineCurveId != null && Object.hasOwnProperty.call(message, "mirrorLineCurveId"))
                    if (!$util.isString(message.mirrorLineCurveId))
                        return "mirrorLineCurveId: string expected";
                return null;
            };

            /**
             * Creates a SketchConstraint message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchConstraint} SketchConstraint
             */
            SketchConstraint.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchConstraint)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchConstraint: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchConstraint();
                if (object.id != null)
                    message.id = String(object.id);
                switch (object.kind) {
                default:
                    if (typeof object.kind === "number") {
                        message.kind = object.kind;
                        break;
                    }
                    break;
                case "SKETCH_CONSTRAINT_UNSPECIFIED":
                case 0:
                    message.kind = 0;
                    break;
                case "SKETCH_CONSTRAINT_COINCIDENT":
                case 1:
                    message.kind = 1;
                    break;
                case "SKETCH_CONSTRAINT_HORIZONTAL":
                case 2:
                    message.kind = 2;
                    break;
                case "SKETCH_CONSTRAINT_VERTICAL":
                case 3:
                    message.kind = 3;
                    break;
                case "SKETCH_CONSTRAINT_PARALLEL":
                case 4:
                    message.kind = 4;
                    break;
                case "SKETCH_CONSTRAINT_PERPENDICULAR":
                case 5:
                    message.kind = 5;
                    break;
                case "SKETCH_CONSTRAINT_TANGENT":
                case 6:
                    message.kind = 6;
                    break;
                case "SKETCH_CONSTRAINT_EQUAL":
                case 7:
                    message.kind = 7;
                    break;
                case "SKETCH_CONSTRAINT_MIDPOINT":
                case 8:
                    message.kind = 8;
                    break;
                case "SKETCH_CONSTRAINT_SYMMETRIC":
                case 9:
                    message.kind = 9;
                    break;
                case "SKETCH_CONSTRAINT_FIXED":
                case 10:
                    message.kind = 10;
                    break;
                case "SKETCH_CONSTRAINT_CONCENTRIC":
                case 11:
                    message.kind = 11;
                    break;
                case "SKETCH_CONSTRAINT_COLLINEAR":
                case 12:
                    message.kind = 12;
                    break;
                case "SKETCH_CONSTRAINT_DISTANCE":
                case 13:
                    message.kind = 13;
                    break;
                case "SKETCH_CONSTRAINT_ANGLE":
                case 14:
                    message.kind = 14;
                    break;
                case "SKETCH_CONSTRAINT_RADIUS":
                case 15:
                    message.kind = 15;
                    break;
                case "SKETCH_CONSTRAINT_DIAMETER":
                case 16:
                    message.kind = 16;
                    break;
                case "SKETCH_CONSTRAINT_LENGTH":
                case 17:
                    message.kind = 17;
                    break;
                }
                if (object.curveIndices) {
                    if (!Array.isArray(object.curveIndices))
                        throw TypeError(".cadompart.v0_2.SketchConstraint.curveIndices: array expected");
                    message.curveIndices = [];
                    for (let i = 0; i < object.curveIndices.length; ++i)
                        message.curveIndices[i] = object.curveIndices[i] >>> 0;
                }
                if (object.points) {
                    if (!Array.isArray(object.points))
                        throw TypeError(".cadompart.v0_2.SketchConstraint.points: array expected");
                    message.points = [];
                    for (let i = 0; i < object.points.length; ++i) {
                        if (!$util.isObject(object.points[i]))
                            throw TypeError(".cadompart.v0_2.SketchConstraint.points: object expected");
                        message.points[i] = $root.cadompart.v0_2.SketchPointRef.fromObject(object.points[i], long + 1);
                    }
                }
                if (object.value != null)
                    message.value = Number(object.value);
                if (object.parameterId != null)
                    message.parameterId = String(object.parameterId);
                if (object.mirrorLineCurveId != null)
                    message.mirrorLineCurveId = String(object.mirrorLineCurveId);
                return message;
            };

            /**
             * Creates a plain object from a SketchConstraint message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {cadompart.v0_2.SketchConstraint} message SketchConstraint
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchConstraint.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.curveIndices = [];
                    object.points = [];
                }
                if (options.defaults) {
                    object.id = "";
                    object.kind = options.enums === String ? "SKETCH_CONSTRAINT_UNSPECIFIED" : 0;
                    object.parameterId = "";
                    object.mirrorLineCurveId = "";
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    object.kind = options.enums === String ? $root.cadompart.v0_2.SketchConstraintKind[message.kind] === undefined ? message.kind : $root.cadompart.v0_2.SketchConstraintKind[message.kind] : message.kind;
                if (message.curveIndices && message.curveIndices.length) {
                    object.curveIndices = [];
                    for (let j = 0; j < message.curveIndices.length; ++j)
                        object.curveIndices[j] = message.curveIndices[j];
                }
                if (message.points && message.points.length) {
                    object.points = [];
                    for (let j = 0; j < message.points.length; ++j)
                        object.points[j] = $root.cadompart.v0_2.SketchPointRef.toObject(message.points[j], options, q + 1);
                }
                if (message.value != null && Object.hasOwnProperty.call(message, "value")) {
                    object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                    if (options.oneofs)
                        object._value = "value";
                }
                if (message.parameterId != null && Object.hasOwnProperty.call(message, "parameterId"))
                    object.parameterId = message.parameterId;
                if (message.mirrorLineCurveId != null && Object.hasOwnProperty.call(message, "mirrorLineCurveId"))
                    object.mirrorLineCurveId = message.mirrorLineCurveId;
                return object;
            };

            /**
             * Converts this SketchConstraint to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchConstraint
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchConstraint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchConstraint
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchConstraint
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchConstraint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchConstraint";
            };

            return SketchConstraint;
        })();

        v0_2.SketchLoop = (function() {

            /**
             * Properties of a SketchLoop.
             * @memberof cadompart.v0_2
             * @interface ISketchLoop
             * @property {Array.<number>|null} [curveIndices] SketchLoop curveIndices
             * @property {boolean|null} [outer] SketchLoop outer
             */

            /**
             * Constructs a new SketchLoop.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchLoop.
             * @implements ISketchLoop
             * @constructor
             * @param {cadompart.v0_2.ISketchLoop=} [properties] Properties to set
             */
            function SketchLoop(properties) {
                this.curveIndices = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchLoop curveIndices.
             * @member {Array.<number>} curveIndices
             * @memberof cadompart.v0_2.SketchLoop
             * @instance
             */
            SketchLoop.prototype.curveIndices = $util.emptyArray;

            /**
             * SketchLoop outer.
             * @member {boolean} outer
             * @memberof cadompart.v0_2.SketchLoop
             * @instance
             */
            SketchLoop.prototype.outer = false;

            /**
             * Creates a new SketchLoop instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {cadompart.v0_2.ISketchLoop=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchLoop} SketchLoop instance
             */
            SketchLoop.create = function create(properties) {
                return new SketchLoop(properties);
            };

            /**
             * Encodes the specified SketchLoop message. Does not implicitly {@link cadompart.v0_2.SketchLoop.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {cadompart.v0_2.ISketchLoop} message SketchLoop message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchLoop.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.curveIndices != null && message.curveIndices.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (let i = 0; i < message.curveIndices.length; ++i)
                        writer.uint32(message.curveIndices[i]);
                    writer.ldelim();
                }
                if (message.outer != null && Object.hasOwnProperty.call(message, "outer"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.outer);
                return writer;
            };

            /**
             * Encodes the specified SketchLoop message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchLoop.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {cadompart.v0_2.ISketchLoop} message SketchLoop message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchLoop.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchLoop message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchLoop} SketchLoop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchLoop.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchLoop();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.curveIndices && message.curveIndices.length))
                                message.curveIndices = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                if (end2 > reader.len)
                                    throw RangeError("index out of range");
                                reader.len = end2;
                                while (reader.pos < end2)
                                    message.curveIndices.push(reader.uint32());
                                if (reader.pos !== end2)
                                    throw RangeError("index out of range");
                                reader.len = end;
                            } else
                                message.curveIndices.push(reader.uint32());
                            break;
                        }
                    case 2: {
                            message.outer = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchLoop message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchLoop} SketchLoop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchLoop.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchLoop message.
             * @function verify
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchLoop.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.curveIndices != null && Object.hasOwnProperty.call(message, "curveIndices")) {
                    if (!Array.isArray(message.curveIndices))
                        return "curveIndices: array expected";
                    for (let i = 0; i < message.curveIndices.length; ++i)
                        if (!$util.isInteger(message.curveIndices[i]))
                            return "curveIndices: integer[] expected";
                }
                if (message.outer != null && Object.hasOwnProperty.call(message, "outer"))
                    if (typeof message.outer !== "boolean")
                        return "outer: boolean expected";
                return null;
            };

            /**
             * Creates a SketchLoop message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchLoop} SketchLoop
             */
            SketchLoop.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchLoop)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchLoop: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchLoop();
                if (object.curveIndices) {
                    if (!Array.isArray(object.curveIndices))
                        throw TypeError(".cadompart.v0_2.SketchLoop.curveIndices: array expected");
                    message.curveIndices = [];
                    for (let i = 0; i < object.curveIndices.length; ++i)
                        message.curveIndices[i] = object.curveIndices[i] >>> 0;
                }
                if (object.outer != null)
                    message.outer = Boolean(object.outer);
                return message;
            };

            /**
             * Creates a plain object from a SketchLoop message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {cadompart.v0_2.SketchLoop} message SketchLoop
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchLoop.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.curveIndices = [];
                if (options.defaults)
                    object.outer = false;
                if (message.curveIndices && message.curveIndices.length) {
                    object.curveIndices = [];
                    for (let j = 0; j < message.curveIndices.length; ++j)
                        object.curveIndices[j] = message.curveIndices[j];
                }
                if (message.outer != null && Object.hasOwnProperty.call(message, "outer"))
                    object.outer = message.outer;
                return object;
            };

            /**
             * Converts this SketchLoop to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchLoop
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchLoop.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchLoop
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchLoop
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchLoop.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchLoop";
            };

            return SketchLoop;
        })();

        v0_2.SketchFeature = (function() {

            /**
             * Properties of a SketchFeature.
             * @memberof cadompart.v0_2
             * @interface ISketchFeature
             * @property {cadompart.v0_2.IVec3|null} [origin] SketchFeature origin
             * @property {cadompart.v0_2.IVec3|null} [xAxis] SketchFeature xAxis
             * @property {cadompart.v0_2.IVec3|null} [yAxis] SketchFeature yAxis
             * @property {string|null} [datumPlaneId] SketchFeature datumPlaneId
             * @property {Array.<cadompart.v0_2.ISketchCurve>|null} [curves] SketchFeature curves
             * @property {Array.<cadompart.v0_2.ISketchConstraint>|null} [constraints] SketchFeature constraints
             * @property {Array.<cadompart.v0_2.ISketchLoop>|null} [loops] SketchFeature loops
             */

            /**
             * Constructs a new SketchFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SketchFeature.
             * @implements ISketchFeature
             * @constructor
             * @param {cadompart.v0_2.ISketchFeature=} [properties] Properties to set
             */
            function SketchFeature(properties) {
                this.curves = [];
                this.constraints = [];
                this.loops = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SketchFeature origin.
             * @member {cadompart.v0_2.IVec3|null|undefined} origin
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.origin = null;

            /**
             * SketchFeature xAxis.
             * @member {cadompart.v0_2.IVec3|null|undefined} xAxis
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.xAxis = null;

            /**
             * SketchFeature yAxis.
             * @member {cadompart.v0_2.IVec3|null|undefined} yAxis
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.yAxis = null;

            /**
             * SketchFeature datumPlaneId.
             * @member {string} datumPlaneId
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.datumPlaneId = "";

            /**
             * SketchFeature curves.
             * @member {Array.<cadompart.v0_2.ISketchCurve>} curves
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.curves = $util.emptyArray;

            /**
             * SketchFeature constraints.
             * @member {Array.<cadompart.v0_2.ISketchConstraint>} constraints
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.constraints = $util.emptyArray;

            /**
             * SketchFeature loops.
             * @member {Array.<cadompart.v0_2.ISketchLoop>} loops
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             */
            SketchFeature.prototype.loops = $util.emptyArray;

            /**
             * Creates a new SketchFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {cadompart.v0_2.ISketchFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.SketchFeature} SketchFeature instance
             */
            SketchFeature.create = function create(properties) {
                return new SketchFeature(properties);
            };

            /**
             * Encodes the specified SketchFeature message. Does not implicitly {@link cadompart.v0_2.SketchFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {cadompart.v0_2.ISketchFeature} message SketchFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                    $root.cadompart.v0_2.Vec3.encode(message.origin, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.xAxis != null && Object.hasOwnProperty.call(message, "xAxis"))
                    $root.cadompart.v0_2.Vec3.encode(message.xAxis, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.yAxis != null && Object.hasOwnProperty.call(message, "yAxis"))
                    $root.cadompart.v0_2.Vec3.encode(message.yAxis, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.datumPlaneId != null && Object.hasOwnProperty.call(message, "datumPlaneId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.datumPlaneId);
                if (message.curves != null && message.curves.length)
                    for (let i = 0; i < message.curves.length; ++i)
                        $root.cadompart.v0_2.SketchCurve.encode(message.curves[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                if (message.constraints != null && message.constraints.length)
                    for (let i = 0; i < message.constraints.length; ++i)
                        $root.cadompart.v0_2.SketchConstraint.encode(message.constraints[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
                if (message.loops != null && message.loops.length)
                    for (let i = 0; i < message.loops.length; ++i)
                        $root.cadompart.v0_2.SketchLoop.encode(message.loops[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SketchFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {cadompart.v0_2.ISketchFeature} message SketchFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SketchFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SketchFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SketchFeature} SketchFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SketchFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.origin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 2: {
                            message.xAxis = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.yAxis = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.datumPlaneId = reader.string();
                            break;
                        }
                    case 5: {
                            if (!(message.curves && message.curves.length))
                                message.curves = [];
                            message.curves.push($root.cadompart.v0_2.SketchCurve.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 6: {
                            if (!(message.constraints && message.constraints.length))
                                message.constraints = [];
                            message.constraints.push($root.cadompart.v0_2.SketchConstraint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 7: {
                            if (!(message.loops && message.loops.length))
                                message.loops = [];
                            message.loops.push($root.cadompart.v0_2.SketchLoop.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SketchFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SketchFeature} SketchFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SketchFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SketchFeature message.
             * @function verify
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SketchFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.origin, long + 1);
                    if (error)
                        return "origin." + error;
                }
                if (message.xAxis != null && Object.hasOwnProperty.call(message, "xAxis")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.xAxis, long + 1);
                    if (error)
                        return "xAxis." + error;
                }
                if (message.yAxis != null && Object.hasOwnProperty.call(message, "yAxis")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.yAxis, long + 1);
                    if (error)
                        return "yAxis." + error;
                }
                if (message.datumPlaneId != null && Object.hasOwnProperty.call(message, "datumPlaneId"))
                    if (!$util.isString(message.datumPlaneId))
                        return "datumPlaneId: string expected";
                if (message.curves != null && Object.hasOwnProperty.call(message, "curves")) {
                    if (!Array.isArray(message.curves))
                        return "curves: array expected";
                    for (let i = 0; i < message.curves.length; ++i) {
                        let error = $root.cadompart.v0_2.SketchCurve.verify(message.curves[i], long + 1);
                        if (error)
                            return "curves." + error;
                    }
                }
                if (message.constraints != null && Object.hasOwnProperty.call(message, "constraints")) {
                    if (!Array.isArray(message.constraints))
                        return "constraints: array expected";
                    for (let i = 0; i < message.constraints.length; ++i) {
                        let error = $root.cadompart.v0_2.SketchConstraint.verify(message.constraints[i], long + 1);
                        if (error)
                            return "constraints." + error;
                    }
                }
                if (message.loops != null && Object.hasOwnProperty.call(message, "loops")) {
                    if (!Array.isArray(message.loops))
                        return "loops: array expected";
                    for (let i = 0; i < message.loops.length; ++i) {
                        let error = $root.cadompart.v0_2.SketchLoop.verify(message.loops[i], long + 1);
                        if (error)
                            return "loops." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a SketchFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SketchFeature} SketchFeature
             */
            SketchFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SketchFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SketchFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SketchFeature();
                if (object.origin != null) {
                    if (!$util.isObject(object.origin))
                        throw TypeError(".cadompart.v0_2.SketchFeature.origin: object expected");
                    message.origin = $root.cadompart.v0_2.Vec3.fromObject(object.origin, long + 1);
                }
                if (object.xAxis != null) {
                    if (!$util.isObject(object.xAxis))
                        throw TypeError(".cadompart.v0_2.SketchFeature.xAxis: object expected");
                    message.xAxis = $root.cadompart.v0_2.Vec3.fromObject(object.xAxis, long + 1);
                }
                if (object.yAxis != null) {
                    if (!$util.isObject(object.yAxis))
                        throw TypeError(".cadompart.v0_2.SketchFeature.yAxis: object expected");
                    message.yAxis = $root.cadompart.v0_2.Vec3.fromObject(object.yAxis, long + 1);
                }
                if (object.datumPlaneId != null)
                    message.datumPlaneId = String(object.datumPlaneId);
                if (object.curves) {
                    if (!Array.isArray(object.curves))
                        throw TypeError(".cadompart.v0_2.SketchFeature.curves: array expected");
                    message.curves = [];
                    for (let i = 0; i < object.curves.length; ++i) {
                        if (!$util.isObject(object.curves[i]))
                            throw TypeError(".cadompart.v0_2.SketchFeature.curves: object expected");
                        message.curves[i] = $root.cadompart.v0_2.SketchCurve.fromObject(object.curves[i], long + 1);
                    }
                }
                if (object.constraints) {
                    if (!Array.isArray(object.constraints))
                        throw TypeError(".cadompart.v0_2.SketchFeature.constraints: array expected");
                    message.constraints = [];
                    for (let i = 0; i < object.constraints.length; ++i) {
                        if (!$util.isObject(object.constraints[i]))
                            throw TypeError(".cadompart.v0_2.SketchFeature.constraints: object expected");
                        message.constraints[i] = $root.cadompart.v0_2.SketchConstraint.fromObject(object.constraints[i], long + 1);
                    }
                }
                if (object.loops) {
                    if (!Array.isArray(object.loops))
                        throw TypeError(".cadompart.v0_2.SketchFeature.loops: array expected");
                    message.loops = [];
                    for (let i = 0; i < object.loops.length; ++i) {
                        if (!$util.isObject(object.loops[i]))
                            throw TypeError(".cadompart.v0_2.SketchFeature.loops: object expected");
                        message.loops[i] = $root.cadompart.v0_2.SketchLoop.fromObject(object.loops[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a SketchFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {cadompart.v0_2.SketchFeature} message SketchFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SketchFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.curves = [];
                    object.constraints = [];
                    object.loops = [];
                }
                if (options.defaults) {
                    object.origin = null;
                    object.xAxis = null;
                    object.yAxis = null;
                    object.datumPlaneId = "";
                }
                if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                    object.origin = $root.cadompart.v0_2.Vec3.toObject(message.origin, options, q + 1);
                if (message.xAxis != null && Object.hasOwnProperty.call(message, "xAxis"))
                    object.xAxis = $root.cadompart.v0_2.Vec3.toObject(message.xAxis, options, q + 1);
                if (message.yAxis != null && Object.hasOwnProperty.call(message, "yAxis"))
                    object.yAxis = $root.cadompart.v0_2.Vec3.toObject(message.yAxis, options, q + 1);
                if (message.datumPlaneId != null && Object.hasOwnProperty.call(message, "datumPlaneId"))
                    object.datumPlaneId = message.datumPlaneId;
                if (message.curves && message.curves.length) {
                    object.curves = [];
                    for (let j = 0; j < message.curves.length; ++j)
                        object.curves[j] = $root.cadompart.v0_2.SketchCurve.toObject(message.curves[j], options, q + 1);
                }
                if (message.constraints && message.constraints.length) {
                    object.constraints = [];
                    for (let j = 0; j < message.constraints.length; ++j)
                        object.constraints[j] = $root.cadompart.v0_2.SketchConstraint.toObject(message.constraints[j], options, q + 1);
                }
                if (message.loops && message.loops.length) {
                    object.loops = [];
                    for (let j = 0; j < message.loops.length; ++j)
                        object.loops[j] = $root.cadompart.v0_2.SketchLoop.toObject(message.loops[j], options, q + 1);
                }
                return object;
            };

            /**
             * Converts this SketchFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SketchFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SketchFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SketchFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SketchFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SketchFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SketchFeature";
            };

            return SketchFeature;
        })();

        v0_2.ExtrudeFeature = (function() {

            /**
             * Properties of an ExtrudeFeature.
             * @memberof cadompart.v0_2
             * @interface IExtrudeFeature
             * @property {string|null} [profileSketchId] ExtrudeFeature profileSketchId
             * @property {cadompart.v0_2.EndCondition|null} [endCondition] ExtrudeFeature endCondition
             * @property {number|null} [distance] ExtrudeFeature distance
             * @property {number|null} [distance2] ExtrudeFeature distance2
             * @property {boolean|null} [twoDirection] ExtrudeFeature twoDirection
             * @property {string|null} [toFaceId] ExtrudeFeature toFaceId
             * @property {string|null} [toVertexId] ExtrudeFeature toVertexId
             * @property {number|null} [offsetFromFace] ExtrudeFeature offsetFromFace
             * @property {cadompart.v0_2.IVec3|null} [direction] ExtrudeFeature direction
             * @property {number|null} [draftAngleRad] ExtrudeFeature draftAngleRad
             * @property {boolean|null} [cut] ExtrudeFeature cut
             * @property {boolean|null} [merge] ExtrudeFeature merge
             */

            /**
             * Constructs a new ExtrudeFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents an ExtrudeFeature.
             * @implements IExtrudeFeature
             * @constructor
             * @param {cadompart.v0_2.IExtrudeFeature=} [properties] Properties to set
             */
            function ExtrudeFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExtrudeFeature profileSketchId.
             * @member {string} profileSketchId
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.profileSketchId = "";

            /**
             * ExtrudeFeature endCondition.
             * @member {cadompart.v0_2.EndCondition} endCondition
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.endCondition = 0;

            /**
             * ExtrudeFeature distance.
             * @member {number} distance
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.distance = 0;

            /**
             * ExtrudeFeature distance2.
             * @member {number} distance2
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.distance2 = 0;

            /**
             * ExtrudeFeature twoDirection.
             * @member {boolean} twoDirection
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.twoDirection = false;

            /**
             * ExtrudeFeature toFaceId.
             * @member {string} toFaceId
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.toFaceId = "";

            /**
             * ExtrudeFeature toVertexId.
             * @member {string} toVertexId
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.toVertexId = "";

            /**
             * ExtrudeFeature offsetFromFace.
             * @member {number} offsetFromFace
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.offsetFromFace = 0;

            /**
             * ExtrudeFeature direction.
             * @member {cadompart.v0_2.IVec3|null|undefined} direction
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.direction = null;

            /**
             * ExtrudeFeature draftAngleRad.
             * @member {number} draftAngleRad
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.draftAngleRad = 0;

            /**
             * ExtrudeFeature cut.
             * @member {boolean} cut
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.cut = false;

            /**
             * ExtrudeFeature merge.
             * @member {boolean} merge
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             */
            ExtrudeFeature.prototype.merge = false;

            /**
             * Creates a new ExtrudeFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {cadompart.v0_2.IExtrudeFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.ExtrudeFeature} ExtrudeFeature instance
             */
            ExtrudeFeature.create = function create(properties) {
                return new ExtrudeFeature(properties);
            };

            /**
             * Encodes the specified ExtrudeFeature message. Does not implicitly {@link cadompart.v0_2.ExtrudeFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {cadompart.v0_2.IExtrudeFeature} message ExtrudeFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExtrudeFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.profileSketchId);
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.endCondition);
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.distance);
                if (message.distance2 != null && Object.hasOwnProperty.call(message, "distance2"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.distance2);
                if (message.twoDirection != null && Object.hasOwnProperty.call(message, "twoDirection"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.twoDirection);
                if (message.toFaceId != null && Object.hasOwnProperty.call(message, "toFaceId"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.toFaceId);
                if (message.toVertexId != null && Object.hasOwnProperty.call(message, "toVertexId"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.toVertexId);
                if (message.offsetFromFace != null && Object.hasOwnProperty.call(message, "offsetFromFace"))
                    writer.uint32(/* id 8, wireType 1 =*/65).double(message.offsetFromFace);
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    $root.cadompart.v0_2.Vec3.encode(message.direction, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
                if (message.draftAngleRad != null && Object.hasOwnProperty.call(message, "draftAngleRad"))
                    writer.uint32(/* id 10, wireType 1 =*/81).double(message.draftAngleRad);
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    writer.uint32(/* id 11, wireType 0 =*/88).bool(message.cut);
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    writer.uint32(/* id 12, wireType 0 =*/96).bool(message.merge);
                return writer;
            };

            /**
             * Encodes the specified ExtrudeFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ExtrudeFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {cadompart.v0_2.IExtrudeFeature} message ExtrudeFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExtrudeFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes an ExtrudeFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ExtrudeFeature} ExtrudeFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExtrudeFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ExtrudeFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.profileSketchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.endCondition = reader.int32();
                            break;
                        }
                    case 3: {
                            message.distance = reader.double();
                            break;
                        }
                    case 4: {
                            message.distance2 = reader.double();
                            break;
                        }
                    case 5: {
                            message.twoDirection = reader.bool();
                            break;
                        }
                    case 6: {
                            message.toFaceId = reader.string();
                            break;
                        }
                    case 7: {
                            message.toVertexId = reader.string();
                            break;
                        }
                    case 8: {
                            message.offsetFromFace = reader.double();
                            break;
                        }
                    case 9: {
                            message.direction = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 10: {
                            message.draftAngleRad = reader.double();
                            break;
                        }
                    case 11: {
                            message.cut = reader.bool();
                            break;
                        }
                    case 12: {
                            message.merge = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes an ExtrudeFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ExtrudeFeature} ExtrudeFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExtrudeFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExtrudeFeature message.
             * @function verify
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExtrudeFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    if (!$util.isString(message.profileSketchId))
                        return "profileSketchId: string expected";
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    switch (message.endCondition) {
                    default:
                        return "endCondition: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                    }
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    if (typeof message.distance !== "number")
                        return "distance: number expected";
                if (message.distance2 != null && Object.hasOwnProperty.call(message, "distance2"))
                    if (typeof message.distance2 !== "number")
                        return "distance2: number expected";
                if (message.twoDirection != null && Object.hasOwnProperty.call(message, "twoDirection"))
                    if (typeof message.twoDirection !== "boolean")
                        return "twoDirection: boolean expected";
                if (message.toFaceId != null && Object.hasOwnProperty.call(message, "toFaceId"))
                    if (!$util.isString(message.toFaceId))
                        return "toFaceId: string expected";
                if (message.toVertexId != null && Object.hasOwnProperty.call(message, "toVertexId"))
                    if (!$util.isString(message.toVertexId))
                        return "toVertexId: string expected";
                if (message.offsetFromFace != null && Object.hasOwnProperty.call(message, "offsetFromFace"))
                    if (typeof message.offsetFromFace !== "number")
                        return "offsetFromFace: number expected";
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.direction, long + 1);
                    if (error)
                        return "direction." + error;
                }
                if (message.draftAngleRad != null && Object.hasOwnProperty.call(message, "draftAngleRad"))
                    if (typeof message.draftAngleRad !== "number")
                        return "draftAngleRad: number expected";
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    if (typeof message.cut !== "boolean")
                        return "cut: boolean expected";
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    if (typeof message.merge !== "boolean")
                        return "merge: boolean expected";
                return null;
            };

            /**
             * Creates an ExtrudeFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ExtrudeFeature} ExtrudeFeature
             */
            ExtrudeFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ExtrudeFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ExtrudeFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ExtrudeFeature();
                if (object.profileSketchId != null)
                    message.profileSketchId = String(object.profileSketchId);
                switch (object.endCondition) {
                default:
                    if (typeof object.endCondition === "number") {
                        message.endCondition = object.endCondition;
                        break;
                    }
                    break;
                case "END_CONDITION_UNSPECIFIED":
                case 0:
                    message.endCondition = 0;
                    break;
                case "END_CONDITION_BLIND":
                case 1:
                    message.endCondition = 1;
                    break;
                case "END_CONDITION_THROUGH_ALL":
                case 2:
                    message.endCondition = 2;
                    break;
                case "END_CONDITION_TO_FACE":
                case 3:
                    message.endCondition = 3;
                    break;
                case "END_CONDITION_TO_VERTEX":
                case 4:
                    message.endCondition = 4;
                    break;
                case "END_CONDITION_MIDPLANE":
                case 5:
                    message.endCondition = 5;
                    break;
                case "END_CONDITION_OFFSET_FROM_FACE":
                case 6:
                    message.endCondition = 6;
                    break;
                }
                if (object.distance != null)
                    message.distance = Number(object.distance);
                if (object.distance2 != null)
                    message.distance2 = Number(object.distance2);
                if (object.twoDirection != null)
                    message.twoDirection = Boolean(object.twoDirection);
                if (object.toFaceId != null)
                    message.toFaceId = String(object.toFaceId);
                if (object.toVertexId != null)
                    message.toVertexId = String(object.toVertexId);
                if (object.offsetFromFace != null)
                    message.offsetFromFace = Number(object.offsetFromFace);
                if (object.direction != null) {
                    if (!$util.isObject(object.direction))
                        throw TypeError(".cadompart.v0_2.ExtrudeFeature.direction: object expected");
                    message.direction = $root.cadompart.v0_2.Vec3.fromObject(object.direction, long + 1);
                }
                if (object.draftAngleRad != null)
                    message.draftAngleRad = Number(object.draftAngleRad);
                if (object.cut != null)
                    message.cut = Boolean(object.cut);
                if (object.merge != null)
                    message.merge = Boolean(object.merge);
                return message;
            };

            /**
             * Creates a plain object from an ExtrudeFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {cadompart.v0_2.ExtrudeFeature} message ExtrudeFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExtrudeFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.profileSketchId = "";
                    object.endCondition = options.enums === String ? "END_CONDITION_UNSPECIFIED" : 0;
                    object.distance = 0;
                    object.distance2 = 0;
                    object.twoDirection = false;
                    object.toFaceId = "";
                    object.toVertexId = "";
                    object.offsetFromFace = 0;
                    object.direction = null;
                    object.draftAngleRad = 0;
                    object.cut = false;
                    object.merge = false;
                }
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    object.profileSketchId = message.profileSketchId;
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    object.endCondition = options.enums === String ? $root.cadompart.v0_2.EndCondition[message.endCondition] === undefined ? message.endCondition : $root.cadompart.v0_2.EndCondition[message.endCondition] : message.endCondition;
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
                if (message.distance2 != null && Object.hasOwnProperty.call(message, "distance2"))
                    object.distance2 = options.json && !isFinite(message.distance2) ? String(message.distance2) : message.distance2;
                if (message.twoDirection != null && Object.hasOwnProperty.call(message, "twoDirection"))
                    object.twoDirection = message.twoDirection;
                if (message.toFaceId != null && Object.hasOwnProperty.call(message, "toFaceId"))
                    object.toFaceId = message.toFaceId;
                if (message.toVertexId != null && Object.hasOwnProperty.call(message, "toVertexId"))
                    object.toVertexId = message.toVertexId;
                if (message.offsetFromFace != null && Object.hasOwnProperty.call(message, "offsetFromFace"))
                    object.offsetFromFace = options.json && !isFinite(message.offsetFromFace) ? String(message.offsetFromFace) : message.offsetFromFace;
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    object.direction = $root.cadompart.v0_2.Vec3.toObject(message.direction, options, q + 1);
                if (message.draftAngleRad != null && Object.hasOwnProperty.call(message, "draftAngleRad"))
                    object.draftAngleRad = options.json && !isFinite(message.draftAngleRad) ? String(message.draftAngleRad) : message.draftAngleRad;
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    object.cut = message.cut;
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    object.merge = message.merge;
                return object;
            };

            /**
             * Converts this ExtrudeFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExtrudeFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ExtrudeFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ExtrudeFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ExtrudeFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ExtrudeFeature";
            };

            return ExtrudeFeature;
        })();

        v0_2.RevolveFeature = (function() {

            /**
             * Properties of a RevolveFeature.
             * @memberof cadompart.v0_2
             * @interface IRevolveFeature
             * @property {string|null} [profileSketchId] RevolveFeature profileSketchId
             * @property {cadompart.v0_2.IVec3|null} [axisOrigin] RevolveFeature axisOrigin
             * @property {cadompart.v0_2.IVec3|null} [axisDirection] RevolveFeature axisDirection
             * @property {string|null} [datumAxisId] RevolveFeature datumAxisId
             * @property {cadompart.v0_2.EndCondition|null} [endCondition] RevolveFeature endCondition
             * @property {number|null} [angleRad] RevolveFeature angleRad
             * @property {number|null} [angle2Rad] RevolveFeature angle2Rad
             * @property {boolean|null} [twoDirection] RevolveFeature twoDirection
             * @property {boolean|null} [cut] RevolveFeature cut
             * @property {boolean|null} [merge] RevolveFeature merge
             */

            /**
             * Constructs a new RevolveFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a RevolveFeature.
             * @implements IRevolveFeature
             * @constructor
             * @param {cadompart.v0_2.IRevolveFeature=} [properties] Properties to set
             */
            function RevolveFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RevolveFeature profileSketchId.
             * @member {string} profileSketchId
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.profileSketchId = "";

            /**
             * RevolveFeature axisOrigin.
             * @member {cadompart.v0_2.IVec3|null|undefined} axisOrigin
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.axisOrigin = null;

            /**
             * RevolveFeature axisDirection.
             * @member {cadompart.v0_2.IVec3|null|undefined} axisDirection
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.axisDirection = null;

            /**
             * RevolveFeature datumAxisId.
             * @member {string} datumAxisId
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.datumAxisId = "";

            /**
             * RevolveFeature endCondition.
             * @member {cadompart.v0_2.EndCondition} endCondition
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.endCondition = 0;

            /**
             * RevolveFeature angleRad.
             * @member {number} angleRad
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.angleRad = 0;

            /**
             * RevolveFeature angle2Rad.
             * @member {number} angle2Rad
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.angle2Rad = 0;

            /**
             * RevolveFeature twoDirection.
             * @member {boolean} twoDirection
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.twoDirection = false;

            /**
             * RevolveFeature cut.
             * @member {boolean} cut
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.cut = false;

            /**
             * RevolveFeature merge.
             * @member {boolean} merge
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             */
            RevolveFeature.prototype.merge = false;

            /**
             * Creates a new RevolveFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {cadompart.v0_2.IRevolveFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.RevolveFeature} RevolveFeature instance
             */
            RevolveFeature.create = function create(properties) {
                return new RevolveFeature(properties);
            };

            /**
             * Encodes the specified RevolveFeature message. Does not implicitly {@link cadompart.v0_2.RevolveFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {cadompart.v0_2.IRevolveFeature} message RevolveFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RevolveFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.profileSketchId);
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin"))
                    $root.cadompart.v0_2.Vec3.encode(message.axisOrigin, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection"))
                    $root.cadompart.v0_2.Vec3.encode(message.axisDirection, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.datumAxisId != null && Object.hasOwnProperty.call(message, "datumAxisId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.datumAxisId);
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.endCondition);
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.angleRad);
                if (message.angle2Rad != null && Object.hasOwnProperty.call(message, "angle2Rad"))
                    writer.uint32(/* id 7, wireType 1 =*/57).double(message.angle2Rad);
                if (message.twoDirection != null && Object.hasOwnProperty.call(message, "twoDirection"))
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.twoDirection);
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.cut);
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    writer.uint32(/* id 10, wireType 0 =*/80).bool(message.merge);
                return writer;
            };

            /**
             * Encodes the specified RevolveFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.RevolveFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {cadompart.v0_2.IRevolveFeature} message RevolveFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RevolveFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a RevolveFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.RevolveFeature} RevolveFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RevolveFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.RevolveFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.profileSketchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.axisOrigin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.axisDirection = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.datumAxisId = reader.string();
                            break;
                        }
                    case 5: {
                            message.endCondition = reader.int32();
                            break;
                        }
                    case 6: {
                            message.angleRad = reader.double();
                            break;
                        }
                    case 7: {
                            message.angle2Rad = reader.double();
                            break;
                        }
                    case 8: {
                            message.twoDirection = reader.bool();
                            break;
                        }
                    case 9: {
                            message.cut = reader.bool();
                            break;
                        }
                    case 10: {
                            message.merge = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a RevolveFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.RevolveFeature} RevolveFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RevolveFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RevolveFeature message.
             * @function verify
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RevolveFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    if (!$util.isString(message.profileSketchId))
                        return "profileSketchId: string expected";
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axisOrigin, long + 1);
                    if (error)
                        return "axisOrigin." + error;
                }
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axisDirection, long + 1);
                    if (error)
                        return "axisDirection." + error;
                }
                if (message.datumAxisId != null && Object.hasOwnProperty.call(message, "datumAxisId"))
                    if (!$util.isString(message.datumAxisId))
                        return "datumAxisId: string expected";
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    switch (message.endCondition) {
                    default:
                        return "endCondition: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                    }
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    if (typeof message.angleRad !== "number")
                        return "angleRad: number expected";
                if (message.angle2Rad != null && Object.hasOwnProperty.call(message, "angle2Rad"))
                    if (typeof message.angle2Rad !== "number")
                        return "angle2Rad: number expected";
                if (message.twoDirection != null && Object.hasOwnProperty.call(message, "twoDirection"))
                    if (typeof message.twoDirection !== "boolean")
                        return "twoDirection: boolean expected";
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    if (typeof message.cut !== "boolean")
                        return "cut: boolean expected";
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    if (typeof message.merge !== "boolean")
                        return "merge: boolean expected";
                return null;
            };

            /**
             * Creates a RevolveFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.RevolveFeature} RevolveFeature
             */
            RevolveFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.RevolveFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.RevolveFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.RevolveFeature();
                if (object.profileSketchId != null)
                    message.profileSketchId = String(object.profileSketchId);
                if (object.axisOrigin != null) {
                    if (!$util.isObject(object.axisOrigin))
                        throw TypeError(".cadompart.v0_2.RevolveFeature.axisOrigin: object expected");
                    message.axisOrigin = $root.cadompart.v0_2.Vec3.fromObject(object.axisOrigin, long + 1);
                }
                if (object.axisDirection != null) {
                    if (!$util.isObject(object.axisDirection))
                        throw TypeError(".cadompart.v0_2.RevolveFeature.axisDirection: object expected");
                    message.axisDirection = $root.cadompart.v0_2.Vec3.fromObject(object.axisDirection, long + 1);
                }
                if (object.datumAxisId != null)
                    message.datumAxisId = String(object.datumAxisId);
                switch (object.endCondition) {
                default:
                    if (typeof object.endCondition === "number") {
                        message.endCondition = object.endCondition;
                        break;
                    }
                    break;
                case "END_CONDITION_UNSPECIFIED":
                case 0:
                    message.endCondition = 0;
                    break;
                case "END_CONDITION_BLIND":
                case 1:
                    message.endCondition = 1;
                    break;
                case "END_CONDITION_THROUGH_ALL":
                case 2:
                    message.endCondition = 2;
                    break;
                case "END_CONDITION_TO_FACE":
                case 3:
                    message.endCondition = 3;
                    break;
                case "END_CONDITION_TO_VERTEX":
                case 4:
                    message.endCondition = 4;
                    break;
                case "END_CONDITION_MIDPLANE":
                case 5:
                    message.endCondition = 5;
                    break;
                case "END_CONDITION_OFFSET_FROM_FACE":
                case 6:
                    message.endCondition = 6;
                    break;
                }
                if (object.angleRad != null)
                    message.angleRad = Number(object.angleRad);
                if (object.angle2Rad != null)
                    message.angle2Rad = Number(object.angle2Rad);
                if (object.twoDirection != null)
                    message.twoDirection = Boolean(object.twoDirection);
                if (object.cut != null)
                    message.cut = Boolean(object.cut);
                if (object.merge != null)
                    message.merge = Boolean(object.merge);
                return message;
            };

            /**
             * Creates a plain object from a RevolveFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {cadompart.v0_2.RevolveFeature} message RevolveFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RevolveFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.profileSketchId = "";
                    object.axisOrigin = null;
                    object.axisDirection = null;
                    object.datumAxisId = "";
                    object.endCondition = options.enums === String ? "END_CONDITION_UNSPECIFIED" : 0;
                    object.angleRad = 0;
                    object.angle2Rad = 0;
                    object.twoDirection = false;
                    object.cut = false;
                    object.merge = false;
                }
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    object.profileSketchId = message.profileSketchId;
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin"))
                    object.axisOrigin = $root.cadompart.v0_2.Vec3.toObject(message.axisOrigin, options, q + 1);
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection"))
                    object.axisDirection = $root.cadompart.v0_2.Vec3.toObject(message.axisDirection, options, q + 1);
                if (message.datumAxisId != null && Object.hasOwnProperty.call(message, "datumAxisId"))
                    object.datumAxisId = message.datumAxisId;
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    object.endCondition = options.enums === String ? $root.cadompart.v0_2.EndCondition[message.endCondition] === undefined ? message.endCondition : $root.cadompart.v0_2.EndCondition[message.endCondition] : message.endCondition;
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    object.angleRad = options.json && !isFinite(message.angleRad) ? String(message.angleRad) : message.angleRad;
                if (message.angle2Rad != null && Object.hasOwnProperty.call(message, "angle2Rad"))
                    object.angle2Rad = options.json && !isFinite(message.angle2Rad) ? String(message.angle2Rad) : message.angle2Rad;
                if (message.twoDirection != null && Object.hasOwnProperty.call(message, "twoDirection"))
                    object.twoDirection = message.twoDirection;
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    object.cut = message.cut;
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    object.merge = message.merge;
                return object;
            };

            /**
             * Converts this RevolveFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.RevolveFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RevolveFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RevolveFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.RevolveFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RevolveFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.RevolveFeature";
            };

            return RevolveFeature;
        })();

        v0_2.SweepFeature = (function() {

            /**
             * Properties of a SweepFeature.
             * @memberof cadompart.v0_2
             * @interface ISweepFeature
             * @property {string|null} [profileSketchId] SweepFeature profileSketchId
             * @property {string|null} [pathSketchId] SweepFeature pathSketchId
             * @property {boolean|null} [twistFollowPath] SweepFeature twistFollowPath
             * @property {number|null} [twistAngleRad] SweepFeature twistAngleRad
             * @property {boolean|null} [cut] SweepFeature cut
             * @property {boolean|null} [merge] SweepFeature merge
             */

            /**
             * Constructs a new SweepFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SweepFeature.
             * @implements ISweepFeature
             * @constructor
             * @param {cadompart.v0_2.ISweepFeature=} [properties] Properties to set
             */
            function SweepFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SweepFeature profileSketchId.
             * @member {string} profileSketchId
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             */
            SweepFeature.prototype.profileSketchId = "";

            /**
             * SweepFeature pathSketchId.
             * @member {string} pathSketchId
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             */
            SweepFeature.prototype.pathSketchId = "";

            /**
             * SweepFeature twistFollowPath.
             * @member {boolean} twistFollowPath
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             */
            SweepFeature.prototype.twistFollowPath = false;

            /**
             * SweepFeature twistAngleRad.
             * @member {number} twistAngleRad
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             */
            SweepFeature.prototype.twistAngleRad = 0;

            /**
             * SweepFeature cut.
             * @member {boolean} cut
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             */
            SweepFeature.prototype.cut = false;

            /**
             * SweepFeature merge.
             * @member {boolean} merge
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             */
            SweepFeature.prototype.merge = false;

            /**
             * Creates a new SweepFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {cadompart.v0_2.ISweepFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.SweepFeature} SweepFeature instance
             */
            SweepFeature.create = function create(properties) {
                return new SweepFeature(properties);
            };

            /**
             * Encodes the specified SweepFeature message. Does not implicitly {@link cadompart.v0_2.SweepFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {cadompart.v0_2.ISweepFeature} message SweepFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SweepFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.profileSketchId);
                if (message.pathSketchId != null && Object.hasOwnProperty.call(message, "pathSketchId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.pathSketchId);
                if (message.twistFollowPath != null && Object.hasOwnProperty.call(message, "twistFollowPath"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.twistFollowPath);
                if (message.twistAngleRad != null && Object.hasOwnProperty.call(message, "twistAngleRad"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.twistAngleRad);
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.cut);
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.merge);
                return writer;
            };

            /**
             * Encodes the specified SweepFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.SweepFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {cadompart.v0_2.ISweepFeature} message SweepFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SweepFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SweepFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SweepFeature} SweepFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SweepFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SweepFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.profileSketchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.pathSketchId = reader.string();
                            break;
                        }
                    case 3: {
                            message.twistFollowPath = reader.bool();
                            break;
                        }
                    case 4: {
                            message.twistAngleRad = reader.double();
                            break;
                        }
                    case 5: {
                            message.cut = reader.bool();
                            break;
                        }
                    case 6: {
                            message.merge = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SweepFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SweepFeature} SweepFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SweepFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SweepFeature message.
             * @function verify
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SweepFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    if (!$util.isString(message.profileSketchId))
                        return "profileSketchId: string expected";
                if (message.pathSketchId != null && Object.hasOwnProperty.call(message, "pathSketchId"))
                    if (!$util.isString(message.pathSketchId))
                        return "pathSketchId: string expected";
                if (message.twistFollowPath != null && Object.hasOwnProperty.call(message, "twistFollowPath"))
                    if (typeof message.twistFollowPath !== "boolean")
                        return "twistFollowPath: boolean expected";
                if (message.twistAngleRad != null && Object.hasOwnProperty.call(message, "twistAngleRad"))
                    if (typeof message.twistAngleRad !== "number")
                        return "twistAngleRad: number expected";
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    if (typeof message.cut !== "boolean")
                        return "cut: boolean expected";
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    if (typeof message.merge !== "boolean")
                        return "merge: boolean expected";
                return null;
            };

            /**
             * Creates a SweepFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SweepFeature} SweepFeature
             */
            SweepFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SweepFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SweepFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SweepFeature();
                if (object.profileSketchId != null)
                    message.profileSketchId = String(object.profileSketchId);
                if (object.pathSketchId != null)
                    message.pathSketchId = String(object.pathSketchId);
                if (object.twistFollowPath != null)
                    message.twistFollowPath = Boolean(object.twistFollowPath);
                if (object.twistAngleRad != null)
                    message.twistAngleRad = Number(object.twistAngleRad);
                if (object.cut != null)
                    message.cut = Boolean(object.cut);
                if (object.merge != null)
                    message.merge = Boolean(object.merge);
                return message;
            };

            /**
             * Creates a plain object from a SweepFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {cadompart.v0_2.SweepFeature} message SweepFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SweepFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.profileSketchId = "";
                    object.pathSketchId = "";
                    object.twistFollowPath = false;
                    object.twistAngleRad = 0;
                    object.cut = false;
                    object.merge = false;
                }
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    object.profileSketchId = message.profileSketchId;
                if (message.pathSketchId != null && Object.hasOwnProperty.call(message, "pathSketchId"))
                    object.pathSketchId = message.pathSketchId;
                if (message.twistFollowPath != null && Object.hasOwnProperty.call(message, "twistFollowPath"))
                    object.twistFollowPath = message.twistFollowPath;
                if (message.twistAngleRad != null && Object.hasOwnProperty.call(message, "twistAngleRad"))
                    object.twistAngleRad = options.json && !isFinite(message.twistAngleRad) ? String(message.twistAngleRad) : message.twistAngleRad;
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    object.cut = message.cut;
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    object.merge = message.merge;
                return object;
            };

            /**
             * Converts this SweepFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SweepFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SweepFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SweepFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SweepFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SweepFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SweepFeature";
            };

            return SweepFeature;
        })();

        v0_2.LoftProfileRef = (function() {

            /**
             * Properties of a LoftProfileRef.
             * @memberof cadompart.v0_2
             * @interface ILoftProfileRef
             * @property {string|null} [sketchId] LoftProfileRef sketchId
             */

            /**
             * Constructs a new LoftProfileRef.
             * @memberof cadompart.v0_2
             * @classdesc Represents a LoftProfileRef.
             * @implements ILoftProfileRef
             * @constructor
             * @param {cadompart.v0_2.ILoftProfileRef=} [properties] Properties to set
             */
            function LoftProfileRef(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoftProfileRef sketchId.
             * @member {string} sketchId
             * @memberof cadompart.v0_2.LoftProfileRef
             * @instance
             */
            LoftProfileRef.prototype.sketchId = "";

            /**
             * Creates a new LoftProfileRef instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {cadompart.v0_2.ILoftProfileRef=} [properties] Properties to set
             * @returns {cadompart.v0_2.LoftProfileRef} LoftProfileRef instance
             */
            LoftProfileRef.create = function create(properties) {
                return new LoftProfileRef(properties);
            };

            /**
             * Encodes the specified LoftProfileRef message. Does not implicitly {@link cadompart.v0_2.LoftProfileRef.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {cadompart.v0_2.ILoftProfileRef} message LoftProfileRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoftProfileRef.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sketchId != null && Object.hasOwnProperty.call(message, "sketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sketchId);
                return writer;
            };

            /**
             * Encodes the specified LoftProfileRef message, length delimited. Does not implicitly {@link cadompart.v0_2.LoftProfileRef.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {cadompart.v0_2.ILoftProfileRef} message LoftProfileRef message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoftProfileRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a LoftProfileRef message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.LoftProfileRef} LoftProfileRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoftProfileRef.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.LoftProfileRef();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sketchId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a LoftProfileRef message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.LoftProfileRef} LoftProfileRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoftProfileRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoftProfileRef message.
             * @function verify
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoftProfileRef.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sketchId != null && Object.hasOwnProperty.call(message, "sketchId"))
                    if (!$util.isString(message.sketchId))
                        return "sketchId: string expected";
                return null;
            };

            /**
             * Creates a LoftProfileRef message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.LoftProfileRef} LoftProfileRef
             */
            LoftProfileRef.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.LoftProfileRef)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.LoftProfileRef: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.LoftProfileRef();
                if (object.sketchId != null)
                    message.sketchId = String(object.sketchId);
                return message;
            };

            /**
             * Creates a plain object from a LoftProfileRef message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {cadompart.v0_2.LoftProfileRef} message LoftProfileRef
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoftProfileRef.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.sketchId = "";
                if (message.sketchId != null && Object.hasOwnProperty.call(message, "sketchId"))
                    object.sketchId = message.sketchId;
                return object;
            };

            /**
             * Converts this LoftProfileRef to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.LoftProfileRef
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoftProfileRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LoftProfileRef
             * @function getTypeUrl
             * @memberof cadompart.v0_2.LoftProfileRef
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LoftProfileRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.LoftProfileRef";
            };

            return LoftProfileRef;
        })();

        v0_2.LoftFeature = (function() {

            /**
             * Properties of a LoftFeature.
             * @memberof cadompart.v0_2
             * @interface ILoftFeature
             * @property {Array.<cadompart.v0_2.ILoftProfileRef>|null} [profiles] LoftFeature profiles
             * @property {Array.<string>|null} [guideCurveSketchIds] LoftFeature guideCurveSketchIds
             * @property {boolean|null} [closed] LoftFeature closed
             * @property {boolean|null} [cut] LoftFeature cut
             * @property {boolean|null} [merge] LoftFeature merge
             */

            /**
             * Constructs a new LoftFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a LoftFeature.
             * @implements ILoftFeature
             * @constructor
             * @param {cadompart.v0_2.ILoftFeature=} [properties] Properties to set
             */
            function LoftFeature(properties) {
                this.profiles = [];
                this.guideCurveSketchIds = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoftFeature profiles.
             * @member {Array.<cadompart.v0_2.ILoftProfileRef>} profiles
             * @memberof cadompart.v0_2.LoftFeature
             * @instance
             */
            LoftFeature.prototype.profiles = $util.emptyArray;

            /**
             * LoftFeature guideCurveSketchIds.
             * @member {Array.<string>} guideCurveSketchIds
             * @memberof cadompart.v0_2.LoftFeature
             * @instance
             */
            LoftFeature.prototype.guideCurveSketchIds = $util.emptyArray;

            /**
             * LoftFeature closed.
             * @member {boolean} closed
             * @memberof cadompart.v0_2.LoftFeature
             * @instance
             */
            LoftFeature.prototype.closed = false;

            /**
             * LoftFeature cut.
             * @member {boolean} cut
             * @memberof cadompart.v0_2.LoftFeature
             * @instance
             */
            LoftFeature.prototype.cut = false;

            /**
             * LoftFeature merge.
             * @member {boolean} merge
             * @memberof cadompart.v0_2.LoftFeature
             * @instance
             */
            LoftFeature.prototype.merge = false;

            /**
             * Creates a new LoftFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {cadompart.v0_2.ILoftFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.LoftFeature} LoftFeature instance
             */
            LoftFeature.create = function create(properties) {
                return new LoftFeature(properties);
            };

            /**
             * Encodes the specified LoftFeature message. Does not implicitly {@link cadompart.v0_2.LoftFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {cadompart.v0_2.ILoftFeature} message LoftFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoftFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.profiles != null && message.profiles.length)
                    for (let i = 0; i < message.profiles.length; ++i)
                        $root.cadompart.v0_2.LoftProfileRef.encode(message.profiles[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.guideCurveSketchIds != null && message.guideCurveSketchIds.length)
                    for (let i = 0; i < message.guideCurveSketchIds.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.guideCurveSketchIds[i]);
                if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.closed);
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.cut);
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.merge);
                return writer;
            };

            /**
             * Encodes the specified LoftFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.LoftFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {cadompart.v0_2.ILoftFeature} message LoftFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoftFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a LoftFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.LoftFeature} LoftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoftFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.LoftFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.profiles && message.profiles.length))
                                message.profiles = [];
                            message.profiles.push($root.cadompart.v0_2.LoftProfileRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            if (!(message.guideCurveSketchIds && message.guideCurveSketchIds.length))
                                message.guideCurveSketchIds = [];
                            message.guideCurveSketchIds.push(reader.string());
                            break;
                        }
                    case 3: {
                            message.closed = reader.bool();
                            break;
                        }
                    case 4: {
                            message.cut = reader.bool();
                            break;
                        }
                    case 5: {
                            message.merge = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a LoftFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.LoftFeature} LoftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoftFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoftFeature message.
             * @function verify
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoftFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.profiles != null && Object.hasOwnProperty.call(message, "profiles")) {
                    if (!Array.isArray(message.profiles))
                        return "profiles: array expected";
                    for (let i = 0; i < message.profiles.length; ++i) {
                        let error = $root.cadompart.v0_2.LoftProfileRef.verify(message.profiles[i], long + 1);
                        if (error)
                            return "profiles." + error;
                    }
                }
                if (message.guideCurveSketchIds != null && Object.hasOwnProperty.call(message, "guideCurveSketchIds")) {
                    if (!Array.isArray(message.guideCurveSketchIds))
                        return "guideCurveSketchIds: array expected";
                    for (let i = 0; i < message.guideCurveSketchIds.length; ++i)
                        if (!$util.isString(message.guideCurveSketchIds[i]))
                            return "guideCurveSketchIds: string[] expected";
                }
                if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
                    if (typeof message.closed !== "boolean")
                        return "closed: boolean expected";
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    if (typeof message.cut !== "boolean")
                        return "cut: boolean expected";
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    if (typeof message.merge !== "boolean")
                        return "merge: boolean expected";
                return null;
            };

            /**
             * Creates a LoftFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.LoftFeature} LoftFeature
             */
            LoftFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.LoftFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.LoftFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.LoftFeature();
                if (object.profiles) {
                    if (!Array.isArray(object.profiles))
                        throw TypeError(".cadompart.v0_2.LoftFeature.profiles: array expected");
                    message.profiles = [];
                    for (let i = 0; i < object.profiles.length; ++i) {
                        if (!$util.isObject(object.profiles[i]))
                            throw TypeError(".cadompart.v0_2.LoftFeature.profiles: object expected");
                        message.profiles[i] = $root.cadompart.v0_2.LoftProfileRef.fromObject(object.profiles[i], long + 1);
                    }
                }
                if (object.guideCurveSketchIds) {
                    if (!Array.isArray(object.guideCurveSketchIds))
                        throw TypeError(".cadompart.v0_2.LoftFeature.guideCurveSketchIds: array expected");
                    message.guideCurveSketchIds = [];
                    for (let i = 0; i < object.guideCurveSketchIds.length; ++i)
                        message.guideCurveSketchIds[i] = String(object.guideCurveSketchIds[i]);
                }
                if (object.closed != null)
                    message.closed = Boolean(object.closed);
                if (object.cut != null)
                    message.cut = Boolean(object.cut);
                if (object.merge != null)
                    message.merge = Boolean(object.merge);
                return message;
            };

            /**
             * Creates a plain object from a LoftFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {cadompart.v0_2.LoftFeature} message LoftFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoftFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.profiles = [];
                    object.guideCurveSketchIds = [];
                }
                if (options.defaults) {
                    object.closed = false;
                    object.cut = false;
                    object.merge = false;
                }
                if (message.profiles && message.profiles.length) {
                    object.profiles = [];
                    for (let j = 0; j < message.profiles.length; ++j)
                        object.profiles[j] = $root.cadompart.v0_2.LoftProfileRef.toObject(message.profiles[j], options, q + 1);
                }
                if (message.guideCurveSketchIds && message.guideCurveSketchIds.length) {
                    object.guideCurveSketchIds = [];
                    for (let j = 0; j < message.guideCurveSketchIds.length; ++j)
                        object.guideCurveSketchIds[j] = message.guideCurveSketchIds[j];
                }
                if (message.closed != null && Object.hasOwnProperty.call(message, "closed"))
                    object.closed = message.closed;
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    object.cut = message.cut;
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    object.merge = message.merge;
                return object;
            };

            /**
             * Converts this LoftFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.LoftFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoftFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LoftFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.LoftFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LoftFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.LoftFeature";
            };

            return LoftFeature;
        })();

        v0_2.HoleFeature = (function() {

            /**
             * Properties of a HoleFeature.
             * @memberof cadompart.v0_2
             * @interface IHoleFeature
             * @property {cadompart.v0_2.HoleType|null} [holeType] HoleFeature holeType
             * @property {cadompart.v0_2.IVec3|null} [position] HoleFeature position
             * @property {cadompart.v0_2.IVec3|null} [axis] HoleFeature axis
             * @property {string|null} [sketchId] HoleFeature sketchId
             * @property {number|null} [diameter] HoleFeature diameter
             * @property {number|null} [depth] HoleFeature depth
             * @property {cadompart.v0_2.EndCondition|null} [endCondition] HoleFeature endCondition
             * @property {number|null} [counterboreDiameter] HoleFeature counterboreDiameter
             * @property {number|null} [counterboreDepth] HoleFeature counterboreDepth
             * @property {number|null} [countersinkAngleRad] HoleFeature countersinkAngleRad
             * @property {number|null} [countersinkDiameter] HoleFeature countersinkDiameter
             * @property {string|null} [tapDesignation] HoleFeature tapDesignation
             * @property {boolean|null} [thread] HoleFeature thread
             */

            /**
             * Constructs a new HoleFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a HoleFeature.
             * @implements IHoleFeature
             * @constructor
             * @param {cadompart.v0_2.IHoleFeature=} [properties] Properties to set
             */
            function HoleFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HoleFeature holeType.
             * @member {cadompart.v0_2.HoleType} holeType
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.holeType = 0;

            /**
             * HoleFeature position.
             * @member {cadompart.v0_2.IVec3|null|undefined} position
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.position = null;

            /**
             * HoleFeature axis.
             * @member {cadompart.v0_2.IVec3|null|undefined} axis
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.axis = null;

            /**
             * HoleFeature sketchId.
             * @member {string} sketchId
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.sketchId = "";

            /**
             * HoleFeature diameter.
             * @member {number} diameter
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.diameter = 0;

            /**
             * HoleFeature depth.
             * @member {number} depth
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.depth = 0;

            /**
             * HoleFeature endCondition.
             * @member {cadompart.v0_2.EndCondition} endCondition
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.endCondition = 0;

            /**
             * HoleFeature counterboreDiameter.
             * @member {number} counterboreDiameter
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.counterboreDiameter = 0;

            /**
             * HoleFeature counterboreDepth.
             * @member {number} counterboreDepth
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.counterboreDepth = 0;

            /**
             * HoleFeature countersinkAngleRad.
             * @member {number} countersinkAngleRad
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.countersinkAngleRad = 0;

            /**
             * HoleFeature countersinkDiameter.
             * @member {number} countersinkDiameter
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.countersinkDiameter = 0;

            /**
             * HoleFeature tapDesignation.
             * @member {string} tapDesignation
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.tapDesignation = "";

            /**
             * HoleFeature thread.
             * @member {boolean} thread
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             */
            HoleFeature.prototype.thread = false;

            /**
             * Creates a new HoleFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {cadompart.v0_2.IHoleFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.HoleFeature} HoleFeature instance
             */
            HoleFeature.create = function create(properties) {
                return new HoleFeature(properties);
            };

            /**
             * Encodes the specified HoleFeature message. Does not implicitly {@link cadompart.v0_2.HoleFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {cadompart.v0_2.IHoleFeature} message HoleFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HoleFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.holeType != null && Object.hasOwnProperty.call(message, "holeType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.holeType);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    $root.cadompart.v0_2.Vec3.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.axis != null && Object.hasOwnProperty.call(message, "axis"))
                    $root.cadompart.v0_2.Vec3.encode(message.axis, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.sketchId != null && Object.hasOwnProperty.call(message, "sketchId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.sketchId);
                if (message.diameter != null && Object.hasOwnProperty.call(message, "diameter"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.diameter);
                if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.depth);
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.endCondition);
                if (message.counterboreDiameter != null && Object.hasOwnProperty.call(message, "counterboreDiameter"))
                    writer.uint32(/* id 8, wireType 1 =*/65).double(message.counterboreDiameter);
                if (message.counterboreDepth != null && Object.hasOwnProperty.call(message, "counterboreDepth"))
                    writer.uint32(/* id 9, wireType 1 =*/73).double(message.counterboreDepth);
                if (message.countersinkAngleRad != null && Object.hasOwnProperty.call(message, "countersinkAngleRad"))
                    writer.uint32(/* id 10, wireType 1 =*/81).double(message.countersinkAngleRad);
                if (message.countersinkDiameter != null && Object.hasOwnProperty.call(message, "countersinkDiameter"))
                    writer.uint32(/* id 11, wireType 1 =*/89).double(message.countersinkDiameter);
                if (message.tapDesignation != null && Object.hasOwnProperty.call(message, "tapDesignation"))
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.tapDesignation);
                if (message.thread != null && Object.hasOwnProperty.call(message, "thread"))
                    writer.uint32(/* id 13, wireType 0 =*/104).bool(message.thread);
                return writer;
            };

            /**
             * Encodes the specified HoleFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.HoleFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {cadompart.v0_2.IHoleFeature} message HoleFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HoleFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a HoleFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.HoleFeature} HoleFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HoleFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.HoleFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.holeType = reader.int32();
                            break;
                        }
                    case 2: {
                            message.position = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.axis = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.sketchId = reader.string();
                            break;
                        }
                    case 5: {
                            message.diameter = reader.double();
                            break;
                        }
                    case 6: {
                            message.depth = reader.double();
                            break;
                        }
                    case 7: {
                            message.endCondition = reader.int32();
                            break;
                        }
                    case 8: {
                            message.counterboreDiameter = reader.double();
                            break;
                        }
                    case 9: {
                            message.counterboreDepth = reader.double();
                            break;
                        }
                    case 10: {
                            message.countersinkAngleRad = reader.double();
                            break;
                        }
                    case 11: {
                            message.countersinkDiameter = reader.double();
                            break;
                        }
                    case 12: {
                            message.tapDesignation = reader.string();
                            break;
                        }
                    case 13: {
                            message.thread = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a HoleFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.HoleFeature} HoleFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HoleFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HoleFeature message.
             * @function verify
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HoleFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.holeType != null && Object.hasOwnProperty.call(message, "holeType"))
                    switch (message.holeType) {
                    default:
                        return "holeType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.position != null && Object.hasOwnProperty.call(message, "position")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.position, long + 1);
                    if (error)
                        return "position." + error;
                }
                if (message.axis != null && Object.hasOwnProperty.call(message, "axis")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axis, long + 1);
                    if (error)
                        return "axis." + error;
                }
                if (message.sketchId != null && Object.hasOwnProperty.call(message, "sketchId"))
                    if (!$util.isString(message.sketchId))
                        return "sketchId: string expected";
                if (message.diameter != null && Object.hasOwnProperty.call(message, "diameter"))
                    if (typeof message.diameter !== "number")
                        return "diameter: number expected";
                if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                    if (typeof message.depth !== "number")
                        return "depth: number expected";
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    switch (message.endCondition) {
                    default:
                        return "endCondition: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                    }
                if (message.counterboreDiameter != null && Object.hasOwnProperty.call(message, "counterboreDiameter"))
                    if (typeof message.counterboreDiameter !== "number")
                        return "counterboreDiameter: number expected";
                if (message.counterboreDepth != null && Object.hasOwnProperty.call(message, "counterboreDepth"))
                    if (typeof message.counterboreDepth !== "number")
                        return "counterboreDepth: number expected";
                if (message.countersinkAngleRad != null && Object.hasOwnProperty.call(message, "countersinkAngleRad"))
                    if (typeof message.countersinkAngleRad !== "number")
                        return "countersinkAngleRad: number expected";
                if (message.countersinkDiameter != null && Object.hasOwnProperty.call(message, "countersinkDiameter"))
                    if (typeof message.countersinkDiameter !== "number")
                        return "countersinkDiameter: number expected";
                if (message.tapDesignation != null && Object.hasOwnProperty.call(message, "tapDesignation"))
                    if (!$util.isString(message.tapDesignation))
                        return "tapDesignation: string expected";
                if (message.thread != null && Object.hasOwnProperty.call(message, "thread"))
                    if (typeof message.thread !== "boolean")
                        return "thread: boolean expected";
                return null;
            };

            /**
             * Creates a HoleFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.HoleFeature} HoleFeature
             */
            HoleFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.HoleFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.HoleFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.HoleFeature();
                switch (object.holeType) {
                default:
                    if (typeof object.holeType === "number") {
                        message.holeType = object.holeType;
                        break;
                    }
                    break;
                case "HOLE_TYPE_UNSPECIFIED":
                case 0:
                    message.holeType = 0;
                    break;
                case "HOLE_TYPE_SIMPLE":
                case 1:
                    message.holeType = 1;
                    break;
                case "HOLE_TYPE_COUNTERBORE":
                case 2:
                    message.holeType = 2;
                    break;
                case "HOLE_TYPE_COUNTERSINK":
                case 3:
                    message.holeType = 3;
                    break;
                case "HOLE_TYPE_TAP":
                case 4:
                    message.holeType = 4;
                    break;
                }
                if (object.position != null) {
                    if (!$util.isObject(object.position))
                        throw TypeError(".cadompart.v0_2.HoleFeature.position: object expected");
                    message.position = $root.cadompart.v0_2.Vec3.fromObject(object.position, long + 1);
                }
                if (object.axis != null) {
                    if (!$util.isObject(object.axis))
                        throw TypeError(".cadompart.v0_2.HoleFeature.axis: object expected");
                    message.axis = $root.cadompart.v0_2.Vec3.fromObject(object.axis, long + 1);
                }
                if (object.sketchId != null)
                    message.sketchId = String(object.sketchId);
                if (object.diameter != null)
                    message.diameter = Number(object.diameter);
                if (object.depth != null)
                    message.depth = Number(object.depth);
                switch (object.endCondition) {
                default:
                    if (typeof object.endCondition === "number") {
                        message.endCondition = object.endCondition;
                        break;
                    }
                    break;
                case "END_CONDITION_UNSPECIFIED":
                case 0:
                    message.endCondition = 0;
                    break;
                case "END_CONDITION_BLIND":
                case 1:
                    message.endCondition = 1;
                    break;
                case "END_CONDITION_THROUGH_ALL":
                case 2:
                    message.endCondition = 2;
                    break;
                case "END_CONDITION_TO_FACE":
                case 3:
                    message.endCondition = 3;
                    break;
                case "END_CONDITION_TO_VERTEX":
                case 4:
                    message.endCondition = 4;
                    break;
                case "END_CONDITION_MIDPLANE":
                case 5:
                    message.endCondition = 5;
                    break;
                case "END_CONDITION_OFFSET_FROM_FACE":
                case 6:
                    message.endCondition = 6;
                    break;
                }
                if (object.counterboreDiameter != null)
                    message.counterboreDiameter = Number(object.counterboreDiameter);
                if (object.counterboreDepth != null)
                    message.counterboreDepth = Number(object.counterboreDepth);
                if (object.countersinkAngleRad != null)
                    message.countersinkAngleRad = Number(object.countersinkAngleRad);
                if (object.countersinkDiameter != null)
                    message.countersinkDiameter = Number(object.countersinkDiameter);
                if (object.tapDesignation != null)
                    message.tapDesignation = String(object.tapDesignation);
                if (object.thread != null)
                    message.thread = Boolean(object.thread);
                return message;
            };

            /**
             * Creates a plain object from a HoleFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {cadompart.v0_2.HoleFeature} message HoleFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HoleFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.holeType = options.enums === String ? "HOLE_TYPE_UNSPECIFIED" : 0;
                    object.position = null;
                    object.axis = null;
                    object.sketchId = "";
                    object.diameter = 0;
                    object.depth = 0;
                    object.endCondition = options.enums === String ? "END_CONDITION_UNSPECIFIED" : 0;
                    object.counterboreDiameter = 0;
                    object.counterboreDepth = 0;
                    object.countersinkAngleRad = 0;
                    object.countersinkDiameter = 0;
                    object.tapDesignation = "";
                    object.thread = false;
                }
                if (message.holeType != null && Object.hasOwnProperty.call(message, "holeType"))
                    object.holeType = options.enums === String ? $root.cadompart.v0_2.HoleType[message.holeType] === undefined ? message.holeType : $root.cadompart.v0_2.HoleType[message.holeType] : message.holeType;
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    object.position = $root.cadompart.v0_2.Vec3.toObject(message.position, options, q + 1);
                if (message.axis != null && Object.hasOwnProperty.call(message, "axis"))
                    object.axis = $root.cadompart.v0_2.Vec3.toObject(message.axis, options, q + 1);
                if (message.sketchId != null && Object.hasOwnProperty.call(message, "sketchId"))
                    object.sketchId = message.sketchId;
                if (message.diameter != null && Object.hasOwnProperty.call(message, "diameter"))
                    object.diameter = options.json && !isFinite(message.diameter) ? String(message.diameter) : message.diameter;
                if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                    object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
                if (message.endCondition != null && Object.hasOwnProperty.call(message, "endCondition"))
                    object.endCondition = options.enums === String ? $root.cadompart.v0_2.EndCondition[message.endCondition] === undefined ? message.endCondition : $root.cadompart.v0_2.EndCondition[message.endCondition] : message.endCondition;
                if (message.counterboreDiameter != null && Object.hasOwnProperty.call(message, "counterboreDiameter"))
                    object.counterboreDiameter = options.json && !isFinite(message.counterboreDiameter) ? String(message.counterboreDiameter) : message.counterboreDiameter;
                if (message.counterboreDepth != null && Object.hasOwnProperty.call(message, "counterboreDepth"))
                    object.counterboreDepth = options.json && !isFinite(message.counterboreDepth) ? String(message.counterboreDepth) : message.counterboreDepth;
                if (message.countersinkAngleRad != null && Object.hasOwnProperty.call(message, "countersinkAngleRad"))
                    object.countersinkAngleRad = options.json && !isFinite(message.countersinkAngleRad) ? String(message.countersinkAngleRad) : message.countersinkAngleRad;
                if (message.countersinkDiameter != null && Object.hasOwnProperty.call(message, "countersinkDiameter"))
                    object.countersinkDiameter = options.json && !isFinite(message.countersinkDiameter) ? String(message.countersinkDiameter) : message.countersinkDiameter;
                if (message.tapDesignation != null && Object.hasOwnProperty.call(message, "tapDesignation"))
                    object.tapDesignation = message.tapDesignation;
                if (message.thread != null && Object.hasOwnProperty.call(message, "thread"))
                    object.thread = message.thread;
                return object;
            };

            /**
             * Converts this HoleFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.HoleFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HoleFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for HoleFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.HoleFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            HoleFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.HoleFeature";
            };

            return HoleFeature;
        })();

        v0_2.FilletEdgeSet = (function() {

            /**
             * Properties of a FilletEdgeSet.
             * @memberof cadompart.v0_2
             * @interface IFilletEdgeSet
             * @property {Array.<cadompart.v0_2.IEdgeRef>|null} [edges] FilletEdgeSet edges
             * @property {number|null} [radius] FilletEdgeSet radius
             * @property {string|null} [radiusParameterId] FilletEdgeSet radiusParameterId
             */

            /**
             * Constructs a new FilletEdgeSet.
             * @memberof cadompart.v0_2
             * @classdesc Represents a FilletEdgeSet.
             * @implements IFilletEdgeSet
             * @constructor
             * @param {cadompart.v0_2.IFilletEdgeSet=} [properties] Properties to set
             */
            function FilletEdgeSet(properties) {
                this.edges = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FilletEdgeSet edges.
             * @member {Array.<cadompart.v0_2.IEdgeRef>} edges
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @instance
             */
            FilletEdgeSet.prototype.edges = $util.emptyArray;

            /**
             * FilletEdgeSet radius.
             * @member {number} radius
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @instance
             */
            FilletEdgeSet.prototype.radius = 0;

            /**
             * FilletEdgeSet radiusParameterId.
             * @member {string} radiusParameterId
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @instance
             */
            FilletEdgeSet.prototype.radiusParameterId = "";

            /**
             * Creates a new FilletEdgeSet instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {cadompart.v0_2.IFilletEdgeSet=} [properties] Properties to set
             * @returns {cadompart.v0_2.FilletEdgeSet} FilletEdgeSet instance
             */
            FilletEdgeSet.create = function create(properties) {
                return new FilletEdgeSet(properties);
            };

            /**
             * Encodes the specified FilletEdgeSet message. Does not implicitly {@link cadompart.v0_2.FilletEdgeSet.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {cadompart.v0_2.IFilletEdgeSet} message FilletEdgeSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FilletEdgeSet.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.edges != null && message.edges.length)
                    for (let i = 0; i < message.edges.length; ++i)
                        $root.cadompart.v0_2.EdgeRef.encode(message.edges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.radius);
                if (message.radiusParameterId != null && Object.hasOwnProperty.call(message, "radiusParameterId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.radiusParameterId);
                return writer;
            };

            /**
             * Encodes the specified FilletEdgeSet message, length delimited. Does not implicitly {@link cadompart.v0_2.FilletEdgeSet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {cadompart.v0_2.IFilletEdgeSet} message FilletEdgeSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FilletEdgeSet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a FilletEdgeSet message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.FilletEdgeSet} FilletEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FilletEdgeSet.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.FilletEdgeSet();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.edges && message.edges.length))
                                message.edges = [];
                            message.edges.push($root.cadompart.v0_2.EdgeRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.radius = reader.double();
                            break;
                        }
                    case 3: {
                            message.radiusParameterId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a FilletEdgeSet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.FilletEdgeSet} FilletEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FilletEdgeSet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FilletEdgeSet message.
             * @function verify
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FilletEdgeSet.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.edges != null && Object.hasOwnProperty.call(message, "edges")) {
                    if (!Array.isArray(message.edges))
                        return "edges: array expected";
                    for (let i = 0; i < message.edges.length; ++i) {
                        let error = $root.cadompart.v0_2.EdgeRef.verify(message.edges[i], long + 1);
                        if (error)
                            return "edges." + error;
                    }
                }
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    if (typeof message.radius !== "number")
                        return "radius: number expected";
                if (message.radiusParameterId != null && Object.hasOwnProperty.call(message, "radiusParameterId"))
                    if (!$util.isString(message.radiusParameterId))
                        return "radiusParameterId: string expected";
                return null;
            };

            /**
             * Creates a FilletEdgeSet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.FilletEdgeSet} FilletEdgeSet
             */
            FilletEdgeSet.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.FilletEdgeSet)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.FilletEdgeSet: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.FilletEdgeSet();
                if (object.edges) {
                    if (!Array.isArray(object.edges))
                        throw TypeError(".cadompart.v0_2.FilletEdgeSet.edges: array expected");
                    message.edges = [];
                    for (let i = 0; i < object.edges.length; ++i) {
                        if (!$util.isObject(object.edges[i]))
                            throw TypeError(".cadompart.v0_2.FilletEdgeSet.edges: object expected");
                        message.edges[i] = $root.cadompart.v0_2.EdgeRef.fromObject(object.edges[i], long + 1);
                    }
                }
                if (object.radius != null)
                    message.radius = Number(object.radius);
                if (object.radiusParameterId != null)
                    message.radiusParameterId = String(object.radiusParameterId);
                return message;
            };

            /**
             * Creates a plain object from a FilletEdgeSet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {cadompart.v0_2.FilletEdgeSet} message FilletEdgeSet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FilletEdgeSet.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.edges = [];
                if (options.defaults) {
                    object.radius = 0;
                    object.radiusParameterId = "";
                }
                if (message.edges && message.edges.length) {
                    object.edges = [];
                    for (let j = 0; j < message.edges.length; ++j)
                        object.edges[j] = $root.cadompart.v0_2.EdgeRef.toObject(message.edges[j], options, q + 1);
                }
                if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                    object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
                if (message.radiusParameterId != null && Object.hasOwnProperty.call(message, "radiusParameterId"))
                    object.radiusParameterId = message.radiusParameterId;
                return object;
            };

            /**
             * Converts this FilletEdgeSet to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FilletEdgeSet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for FilletEdgeSet
             * @function getTypeUrl
             * @memberof cadompart.v0_2.FilletEdgeSet
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            FilletEdgeSet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.FilletEdgeSet";
            };

            return FilletEdgeSet;
        })();

        v0_2.FilletFeature = (function() {

            /**
             * Properties of a FilletFeature.
             * @memberof cadompart.v0_2
             * @interface IFilletFeature
             * @property {Array.<cadompart.v0_2.IFilletEdgeSet>|null} [sets] FilletFeature sets
             * @property {boolean|null} [tangentPropagate] FilletFeature tangentPropagate
             */

            /**
             * Constructs a new FilletFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a FilletFeature.
             * @implements IFilletFeature
             * @constructor
             * @param {cadompart.v0_2.IFilletFeature=} [properties] Properties to set
             */
            function FilletFeature(properties) {
                this.sets = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FilletFeature sets.
             * @member {Array.<cadompart.v0_2.IFilletEdgeSet>} sets
             * @memberof cadompart.v0_2.FilletFeature
             * @instance
             */
            FilletFeature.prototype.sets = $util.emptyArray;

            /**
             * FilletFeature tangentPropagate.
             * @member {boolean} tangentPropagate
             * @memberof cadompart.v0_2.FilletFeature
             * @instance
             */
            FilletFeature.prototype.tangentPropagate = false;

            /**
             * Creates a new FilletFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {cadompart.v0_2.IFilletFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.FilletFeature} FilletFeature instance
             */
            FilletFeature.create = function create(properties) {
                return new FilletFeature(properties);
            };

            /**
             * Encodes the specified FilletFeature message. Does not implicitly {@link cadompart.v0_2.FilletFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {cadompart.v0_2.IFilletFeature} message FilletFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FilletFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sets != null && message.sets.length)
                    for (let i = 0; i < message.sets.length; ++i)
                        $root.cadompart.v0_2.FilletEdgeSet.encode(message.sets[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.tangentPropagate != null && Object.hasOwnProperty.call(message, "tangentPropagate"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.tangentPropagate);
                return writer;
            };

            /**
             * Encodes the specified FilletFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.FilletFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {cadompart.v0_2.IFilletFeature} message FilletFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FilletFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a FilletFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.FilletFeature} FilletFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FilletFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.FilletFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.sets && message.sets.length))
                                message.sets = [];
                            message.sets.push($root.cadompart.v0_2.FilletEdgeSet.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.tangentPropagate = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a FilletFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.FilletFeature} FilletFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FilletFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FilletFeature message.
             * @function verify
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FilletFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sets != null && Object.hasOwnProperty.call(message, "sets")) {
                    if (!Array.isArray(message.sets))
                        return "sets: array expected";
                    for (let i = 0; i < message.sets.length; ++i) {
                        let error = $root.cadompart.v0_2.FilletEdgeSet.verify(message.sets[i], long + 1);
                        if (error)
                            return "sets." + error;
                    }
                }
                if (message.tangentPropagate != null && Object.hasOwnProperty.call(message, "tangentPropagate"))
                    if (typeof message.tangentPropagate !== "boolean")
                        return "tangentPropagate: boolean expected";
                return null;
            };

            /**
             * Creates a FilletFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.FilletFeature} FilletFeature
             */
            FilletFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.FilletFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.FilletFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.FilletFeature();
                if (object.sets) {
                    if (!Array.isArray(object.sets))
                        throw TypeError(".cadompart.v0_2.FilletFeature.sets: array expected");
                    message.sets = [];
                    for (let i = 0; i < object.sets.length; ++i) {
                        if (!$util.isObject(object.sets[i]))
                            throw TypeError(".cadompart.v0_2.FilletFeature.sets: object expected");
                        message.sets[i] = $root.cadompart.v0_2.FilletEdgeSet.fromObject(object.sets[i], long + 1);
                    }
                }
                if (object.tangentPropagate != null)
                    message.tangentPropagate = Boolean(object.tangentPropagate);
                return message;
            };

            /**
             * Creates a plain object from a FilletFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {cadompart.v0_2.FilletFeature} message FilletFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FilletFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.sets = [];
                if (options.defaults)
                    object.tangentPropagate = false;
                if (message.sets && message.sets.length) {
                    object.sets = [];
                    for (let j = 0; j < message.sets.length; ++j)
                        object.sets[j] = $root.cadompart.v0_2.FilletEdgeSet.toObject(message.sets[j], options, q + 1);
                }
                if (message.tangentPropagate != null && Object.hasOwnProperty.call(message, "tangentPropagate"))
                    object.tangentPropagate = message.tangentPropagate;
                return object;
            };

            /**
             * Converts this FilletFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.FilletFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FilletFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for FilletFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.FilletFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            FilletFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.FilletFeature";
            };

            return FilletFeature;
        })();

        v0_2.ChamferEdgeSet = (function() {

            /**
             * Properties of a ChamferEdgeSet.
             * @memberof cadompart.v0_2
             * @interface IChamferEdgeSet
             * @property {Array.<cadompart.v0_2.IEdgeRef>|null} [edges] ChamferEdgeSet edges
             * @property {number|null} [distance] ChamferEdgeSet distance
             * @property {number|null} [distance2] ChamferEdgeSet distance2
             * @property {number|null} [angleRad] ChamferEdgeSet angleRad
             */

            /**
             * Constructs a new ChamferEdgeSet.
             * @memberof cadompart.v0_2
             * @classdesc Represents a ChamferEdgeSet.
             * @implements IChamferEdgeSet
             * @constructor
             * @param {cadompart.v0_2.IChamferEdgeSet=} [properties] Properties to set
             */
            function ChamferEdgeSet(properties) {
                this.edges = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChamferEdgeSet edges.
             * @member {Array.<cadompart.v0_2.IEdgeRef>} edges
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @instance
             */
            ChamferEdgeSet.prototype.edges = $util.emptyArray;

            /**
             * ChamferEdgeSet distance.
             * @member {number} distance
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @instance
             */
            ChamferEdgeSet.prototype.distance = 0;

            /**
             * ChamferEdgeSet distance2.
             * @member {number|null|undefined} distance2
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @instance
             */
            ChamferEdgeSet.prototype.distance2 = null;

            /**
             * ChamferEdgeSet angleRad.
             * @member {number|null|undefined} angleRad
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @instance
             */
            ChamferEdgeSet.prototype.angleRad = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ChamferEdgeSet.prototype, "_distance2", {
                get: $util.oneOfGetter($oneOfFields = ["distance2"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ChamferEdgeSet.prototype, "_angleRad", {
                get: $util.oneOfGetter($oneOfFields = ["angleRad"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ChamferEdgeSet instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {cadompart.v0_2.IChamferEdgeSet=} [properties] Properties to set
             * @returns {cadompart.v0_2.ChamferEdgeSet} ChamferEdgeSet instance
             */
            ChamferEdgeSet.create = function create(properties) {
                return new ChamferEdgeSet(properties);
            };

            /**
             * Encodes the specified ChamferEdgeSet message. Does not implicitly {@link cadompart.v0_2.ChamferEdgeSet.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {cadompart.v0_2.IChamferEdgeSet} message ChamferEdgeSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChamferEdgeSet.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.edges != null && message.edges.length)
                    for (let i = 0; i < message.edges.length; ++i)
                        $root.cadompart.v0_2.EdgeRef.encode(message.edges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.distance);
                if (message.distance2 != null && Object.hasOwnProperty.call(message, "distance2"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.distance2);
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.angleRad);
                return writer;
            };

            /**
             * Encodes the specified ChamferEdgeSet message, length delimited. Does not implicitly {@link cadompart.v0_2.ChamferEdgeSet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {cadompart.v0_2.IChamferEdgeSet} message ChamferEdgeSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChamferEdgeSet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ChamferEdgeSet message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ChamferEdgeSet} ChamferEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChamferEdgeSet.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ChamferEdgeSet();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.edges && message.edges.length))
                                message.edges = [];
                            message.edges.push($root.cadompart.v0_2.EdgeRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.distance = reader.double();
                            break;
                        }
                    case 3: {
                            message.distance2 = reader.double();
                            break;
                        }
                    case 4: {
                            message.angleRad = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a ChamferEdgeSet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ChamferEdgeSet} ChamferEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChamferEdgeSet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChamferEdgeSet message.
             * @function verify
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChamferEdgeSet.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.edges != null && Object.hasOwnProperty.call(message, "edges")) {
                    if (!Array.isArray(message.edges))
                        return "edges: array expected";
                    for (let i = 0; i < message.edges.length; ++i) {
                        let error = $root.cadompart.v0_2.EdgeRef.verify(message.edges[i], long + 1);
                        if (error)
                            return "edges." + error;
                    }
                }
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    if (typeof message.distance !== "number")
                        return "distance: number expected";
                if (message.distance2 != null && Object.hasOwnProperty.call(message, "distance2")) {
                    properties._distance2 = 1;
                    if (typeof message.distance2 !== "number")
                        return "distance2: number expected";
                }
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad")) {
                    properties._angleRad = 1;
                    if (typeof message.angleRad !== "number")
                        return "angleRad: number expected";
                }
                return null;
            };

            /**
             * Creates a ChamferEdgeSet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ChamferEdgeSet} ChamferEdgeSet
             */
            ChamferEdgeSet.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ChamferEdgeSet)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ChamferEdgeSet: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ChamferEdgeSet();
                if (object.edges) {
                    if (!Array.isArray(object.edges))
                        throw TypeError(".cadompart.v0_2.ChamferEdgeSet.edges: array expected");
                    message.edges = [];
                    for (let i = 0; i < object.edges.length; ++i) {
                        if (!$util.isObject(object.edges[i]))
                            throw TypeError(".cadompart.v0_2.ChamferEdgeSet.edges: object expected");
                        message.edges[i] = $root.cadompart.v0_2.EdgeRef.fromObject(object.edges[i], long + 1);
                    }
                }
                if (object.distance != null)
                    message.distance = Number(object.distance);
                if (object.distance2 != null)
                    message.distance2 = Number(object.distance2);
                if (object.angleRad != null)
                    message.angleRad = Number(object.angleRad);
                return message;
            };

            /**
             * Creates a plain object from a ChamferEdgeSet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {cadompart.v0_2.ChamferEdgeSet} message ChamferEdgeSet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChamferEdgeSet.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.edges = [];
                if (options.defaults)
                    object.distance = 0;
                if (message.edges && message.edges.length) {
                    object.edges = [];
                    for (let j = 0; j < message.edges.length; ++j)
                        object.edges[j] = $root.cadompart.v0_2.EdgeRef.toObject(message.edges[j], options, q + 1);
                }
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
                if (message.distance2 != null && Object.hasOwnProperty.call(message, "distance2")) {
                    object.distance2 = options.json && !isFinite(message.distance2) ? String(message.distance2) : message.distance2;
                    if (options.oneofs)
                        object._distance2 = "distance2";
                }
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad")) {
                    object.angleRad = options.json && !isFinite(message.angleRad) ? String(message.angleRad) : message.angleRad;
                    if (options.oneofs)
                        object._angleRad = "angleRad";
                }
                return object;
            };

            /**
             * Converts this ChamferEdgeSet to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChamferEdgeSet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ChamferEdgeSet
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ChamferEdgeSet
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChamferEdgeSet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ChamferEdgeSet";
            };

            return ChamferEdgeSet;
        })();

        v0_2.ChamferFeature = (function() {

            /**
             * Properties of a ChamferFeature.
             * @memberof cadompart.v0_2
             * @interface IChamferFeature
             * @property {Array.<cadompart.v0_2.IChamferEdgeSet>|null} [sets] ChamferFeature sets
             * @property {boolean|null} [tangentPropagate] ChamferFeature tangentPropagate
             */

            /**
             * Constructs a new ChamferFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a ChamferFeature.
             * @implements IChamferFeature
             * @constructor
             * @param {cadompart.v0_2.IChamferFeature=} [properties] Properties to set
             */
            function ChamferFeature(properties) {
                this.sets = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChamferFeature sets.
             * @member {Array.<cadompart.v0_2.IChamferEdgeSet>} sets
             * @memberof cadompart.v0_2.ChamferFeature
             * @instance
             */
            ChamferFeature.prototype.sets = $util.emptyArray;

            /**
             * ChamferFeature tangentPropagate.
             * @member {boolean} tangentPropagate
             * @memberof cadompart.v0_2.ChamferFeature
             * @instance
             */
            ChamferFeature.prototype.tangentPropagate = false;

            /**
             * Creates a new ChamferFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {cadompart.v0_2.IChamferFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.ChamferFeature} ChamferFeature instance
             */
            ChamferFeature.create = function create(properties) {
                return new ChamferFeature(properties);
            };

            /**
             * Encodes the specified ChamferFeature message. Does not implicitly {@link cadompart.v0_2.ChamferFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {cadompart.v0_2.IChamferFeature} message ChamferFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChamferFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sets != null && message.sets.length)
                    for (let i = 0; i < message.sets.length; ++i)
                        $root.cadompart.v0_2.ChamferEdgeSet.encode(message.sets[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.tangentPropagate != null && Object.hasOwnProperty.call(message, "tangentPropagate"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.tangentPropagate);
                return writer;
            };

            /**
             * Encodes the specified ChamferFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ChamferFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {cadompart.v0_2.IChamferFeature} message ChamferFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChamferFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ChamferFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ChamferFeature} ChamferFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChamferFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ChamferFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.sets && message.sets.length))
                                message.sets = [];
                            message.sets.push($root.cadompart.v0_2.ChamferEdgeSet.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.tangentPropagate = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a ChamferFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ChamferFeature} ChamferFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChamferFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChamferFeature message.
             * @function verify
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChamferFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sets != null && Object.hasOwnProperty.call(message, "sets")) {
                    if (!Array.isArray(message.sets))
                        return "sets: array expected";
                    for (let i = 0; i < message.sets.length; ++i) {
                        let error = $root.cadompart.v0_2.ChamferEdgeSet.verify(message.sets[i], long + 1);
                        if (error)
                            return "sets." + error;
                    }
                }
                if (message.tangentPropagate != null && Object.hasOwnProperty.call(message, "tangentPropagate"))
                    if (typeof message.tangentPropagate !== "boolean")
                        return "tangentPropagate: boolean expected";
                return null;
            };

            /**
             * Creates a ChamferFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ChamferFeature} ChamferFeature
             */
            ChamferFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ChamferFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ChamferFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ChamferFeature();
                if (object.sets) {
                    if (!Array.isArray(object.sets))
                        throw TypeError(".cadompart.v0_2.ChamferFeature.sets: array expected");
                    message.sets = [];
                    for (let i = 0; i < object.sets.length; ++i) {
                        if (!$util.isObject(object.sets[i]))
                            throw TypeError(".cadompart.v0_2.ChamferFeature.sets: object expected");
                        message.sets[i] = $root.cadompart.v0_2.ChamferEdgeSet.fromObject(object.sets[i], long + 1);
                    }
                }
                if (object.tangentPropagate != null)
                    message.tangentPropagate = Boolean(object.tangentPropagate);
                return message;
            };

            /**
             * Creates a plain object from a ChamferFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {cadompart.v0_2.ChamferFeature} message ChamferFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChamferFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.sets = [];
                if (options.defaults)
                    object.tangentPropagate = false;
                if (message.sets && message.sets.length) {
                    object.sets = [];
                    for (let j = 0; j < message.sets.length; ++j)
                        object.sets[j] = $root.cadompart.v0_2.ChamferEdgeSet.toObject(message.sets[j], options, q + 1);
                }
                if (message.tangentPropagate != null && Object.hasOwnProperty.call(message, "tangentPropagate"))
                    object.tangentPropagate = message.tangentPropagate;
                return object;
            };

            /**
             * Converts this ChamferFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ChamferFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChamferFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ChamferFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ChamferFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChamferFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ChamferFeature";
            };

            return ChamferFeature;
        })();

        v0_2.ShellFeature = (function() {

            /**
             * Properties of a ShellFeature.
             * @memberof cadompart.v0_2
             * @interface IShellFeature
             * @property {Array.<cadompart.v0_2.IFaceRef>|null} [facesToRemove] ShellFeature facesToRemove
             * @property {number|null} [thickness] ShellFeature thickness
             * @property {boolean|null} [outward] ShellFeature outward
             */

            /**
             * Constructs a new ShellFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a ShellFeature.
             * @implements IShellFeature
             * @constructor
             * @param {cadompart.v0_2.IShellFeature=} [properties] Properties to set
             */
            function ShellFeature(properties) {
                this.facesToRemove = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ShellFeature facesToRemove.
             * @member {Array.<cadompart.v0_2.IFaceRef>} facesToRemove
             * @memberof cadompart.v0_2.ShellFeature
             * @instance
             */
            ShellFeature.prototype.facesToRemove = $util.emptyArray;

            /**
             * ShellFeature thickness.
             * @member {number} thickness
             * @memberof cadompart.v0_2.ShellFeature
             * @instance
             */
            ShellFeature.prototype.thickness = 0;

            /**
             * ShellFeature outward.
             * @member {boolean} outward
             * @memberof cadompart.v0_2.ShellFeature
             * @instance
             */
            ShellFeature.prototype.outward = false;

            /**
             * Creates a new ShellFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {cadompart.v0_2.IShellFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.ShellFeature} ShellFeature instance
             */
            ShellFeature.create = function create(properties) {
                return new ShellFeature(properties);
            };

            /**
             * Encodes the specified ShellFeature message. Does not implicitly {@link cadompart.v0_2.ShellFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {cadompart.v0_2.IShellFeature} message ShellFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ShellFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.facesToRemove != null && message.facesToRemove.length)
                    for (let i = 0; i < message.facesToRemove.length; ++i)
                        $root.cadompart.v0_2.FaceRef.encode(message.facesToRemove[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.thickness);
                if (message.outward != null && Object.hasOwnProperty.call(message, "outward"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.outward);
                return writer;
            };

            /**
             * Encodes the specified ShellFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ShellFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {cadompart.v0_2.IShellFeature} message ShellFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ShellFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ShellFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ShellFeature} ShellFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ShellFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ShellFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.facesToRemove && message.facesToRemove.length))
                                message.facesToRemove = [];
                            message.facesToRemove.push($root.cadompart.v0_2.FaceRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.thickness = reader.double();
                            break;
                        }
                    case 3: {
                            message.outward = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a ShellFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ShellFeature} ShellFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ShellFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ShellFeature message.
             * @function verify
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ShellFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.facesToRemove != null && Object.hasOwnProperty.call(message, "facesToRemove")) {
                    if (!Array.isArray(message.facesToRemove))
                        return "facesToRemove: array expected";
                    for (let i = 0; i < message.facesToRemove.length; ++i) {
                        let error = $root.cadompart.v0_2.FaceRef.verify(message.facesToRemove[i], long + 1);
                        if (error)
                            return "facesToRemove." + error;
                    }
                }
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    if (typeof message.thickness !== "number")
                        return "thickness: number expected";
                if (message.outward != null && Object.hasOwnProperty.call(message, "outward"))
                    if (typeof message.outward !== "boolean")
                        return "outward: boolean expected";
                return null;
            };

            /**
             * Creates a ShellFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ShellFeature} ShellFeature
             */
            ShellFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ShellFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ShellFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ShellFeature();
                if (object.facesToRemove) {
                    if (!Array.isArray(object.facesToRemove))
                        throw TypeError(".cadompart.v0_2.ShellFeature.facesToRemove: array expected");
                    message.facesToRemove = [];
                    for (let i = 0; i < object.facesToRemove.length; ++i) {
                        if (!$util.isObject(object.facesToRemove[i]))
                            throw TypeError(".cadompart.v0_2.ShellFeature.facesToRemove: object expected");
                        message.facesToRemove[i] = $root.cadompart.v0_2.FaceRef.fromObject(object.facesToRemove[i], long + 1);
                    }
                }
                if (object.thickness != null)
                    message.thickness = Number(object.thickness);
                if (object.outward != null)
                    message.outward = Boolean(object.outward);
                return message;
            };

            /**
             * Creates a plain object from a ShellFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {cadompart.v0_2.ShellFeature} message ShellFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ShellFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.facesToRemove = [];
                if (options.defaults) {
                    object.thickness = 0;
                    object.outward = false;
                }
                if (message.facesToRemove && message.facesToRemove.length) {
                    object.facesToRemove = [];
                    for (let j = 0; j < message.facesToRemove.length; ++j)
                        object.facesToRemove[j] = $root.cadompart.v0_2.FaceRef.toObject(message.facesToRemove[j], options, q + 1);
                }
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    object.thickness = options.json && !isFinite(message.thickness) ? String(message.thickness) : message.thickness;
                if (message.outward != null && Object.hasOwnProperty.call(message, "outward"))
                    object.outward = message.outward;
                return object;
            };

            /**
             * Converts this ShellFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ShellFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ShellFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ShellFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ShellFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ShellFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ShellFeature";
            };

            return ShellFeature;
        })();

        v0_2.DraftFeature = (function() {

            /**
             * Properties of a DraftFeature.
             * @memberof cadompart.v0_2
             * @interface IDraftFeature
             * @property {cadompart.v0_2.DraftSide|null} [sideType] DraftFeature sideType
             * @property {string|null} [neutralPlaneId] DraftFeature neutralPlaneId
             * @property {Array.<cadompart.v0_2.IFaceRef>|null} [faces] DraftFeature faces
             * @property {number|null} [angleRad] DraftFeature angleRad
             * @property {cadompart.v0_2.IVec3|null} [pullDirection] DraftFeature pullDirection
             */

            /**
             * Constructs a new DraftFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a DraftFeature.
             * @implements IDraftFeature
             * @constructor
             * @param {cadompart.v0_2.IDraftFeature=} [properties] Properties to set
             */
            function DraftFeature(properties) {
                this.faces = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DraftFeature sideType.
             * @member {cadompart.v0_2.DraftSide} sideType
             * @memberof cadompart.v0_2.DraftFeature
             * @instance
             */
            DraftFeature.prototype.sideType = 0;

            /**
             * DraftFeature neutralPlaneId.
             * @member {string} neutralPlaneId
             * @memberof cadompart.v0_2.DraftFeature
             * @instance
             */
            DraftFeature.prototype.neutralPlaneId = "";

            /**
             * DraftFeature faces.
             * @member {Array.<cadompart.v0_2.IFaceRef>} faces
             * @memberof cadompart.v0_2.DraftFeature
             * @instance
             */
            DraftFeature.prototype.faces = $util.emptyArray;

            /**
             * DraftFeature angleRad.
             * @member {number} angleRad
             * @memberof cadompart.v0_2.DraftFeature
             * @instance
             */
            DraftFeature.prototype.angleRad = 0;

            /**
             * DraftFeature pullDirection.
             * @member {cadompart.v0_2.IVec3|null|undefined} pullDirection
             * @memberof cadompart.v0_2.DraftFeature
             * @instance
             */
            DraftFeature.prototype.pullDirection = null;

            /**
             * Creates a new DraftFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {cadompart.v0_2.IDraftFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.DraftFeature} DraftFeature instance
             */
            DraftFeature.create = function create(properties) {
                return new DraftFeature(properties);
            };

            /**
             * Encodes the specified DraftFeature message. Does not implicitly {@link cadompart.v0_2.DraftFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {cadompart.v0_2.IDraftFeature} message DraftFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DraftFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sideType != null && Object.hasOwnProperty.call(message, "sideType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sideType);
                if (message.neutralPlaneId != null && Object.hasOwnProperty.call(message, "neutralPlaneId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.neutralPlaneId);
                if (message.faces != null && message.faces.length)
                    for (let i = 0; i < message.faces.length; ++i)
                        $root.cadompart.v0_2.FaceRef.encode(message.faces[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.angleRad);
                if (message.pullDirection != null && Object.hasOwnProperty.call(message, "pullDirection"))
                    $root.cadompart.v0_2.Vec3.encode(message.pullDirection, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DraftFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.DraftFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {cadompart.v0_2.IDraftFeature} message DraftFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DraftFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a DraftFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.DraftFeature} DraftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DraftFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.DraftFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sideType = reader.int32();
                            break;
                        }
                    case 2: {
                            message.neutralPlaneId = reader.string();
                            break;
                        }
                    case 3: {
                            if (!(message.faces && message.faces.length))
                                message.faces = [];
                            message.faces.push($root.cadompart.v0_2.FaceRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 4: {
                            message.angleRad = reader.double();
                            break;
                        }
                    case 5: {
                            message.pullDirection = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a DraftFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.DraftFeature} DraftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DraftFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DraftFeature message.
             * @function verify
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DraftFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sideType != null && Object.hasOwnProperty.call(message, "sideType"))
                    switch (message.sideType) {
                    default:
                        return "sideType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.neutralPlaneId != null && Object.hasOwnProperty.call(message, "neutralPlaneId"))
                    if (!$util.isString(message.neutralPlaneId))
                        return "neutralPlaneId: string expected";
                if (message.faces != null && Object.hasOwnProperty.call(message, "faces")) {
                    if (!Array.isArray(message.faces))
                        return "faces: array expected";
                    for (let i = 0; i < message.faces.length; ++i) {
                        let error = $root.cadompart.v0_2.FaceRef.verify(message.faces[i], long + 1);
                        if (error)
                            return "faces." + error;
                    }
                }
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    if (typeof message.angleRad !== "number")
                        return "angleRad: number expected";
                if (message.pullDirection != null && Object.hasOwnProperty.call(message, "pullDirection")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.pullDirection, long + 1);
                    if (error)
                        return "pullDirection." + error;
                }
                return null;
            };

            /**
             * Creates a DraftFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.DraftFeature} DraftFeature
             */
            DraftFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.DraftFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.DraftFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.DraftFeature();
                switch (object.sideType) {
                default:
                    if (typeof object.sideType === "number") {
                        message.sideType = object.sideType;
                        break;
                    }
                    break;
                case "DRAFT_SIDE_UNSPECIFIED":
                case 0:
                    message.sideType = 0;
                    break;
                case "DRAFT_SIDE_NEUTRAL_PLANE":
                case 1:
                    message.sideType = 1;
                    break;
                case "DRAFT_SIDE_PARTING_LINE":
                case 2:
                    message.sideType = 2;
                    break;
                case "DRAFT_SIDE_STEP":
                case 3:
                    message.sideType = 3;
                    break;
                }
                if (object.neutralPlaneId != null)
                    message.neutralPlaneId = String(object.neutralPlaneId);
                if (object.faces) {
                    if (!Array.isArray(object.faces))
                        throw TypeError(".cadompart.v0_2.DraftFeature.faces: array expected");
                    message.faces = [];
                    for (let i = 0; i < object.faces.length; ++i) {
                        if (!$util.isObject(object.faces[i]))
                            throw TypeError(".cadompart.v0_2.DraftFeature.faces: object expected");
                        message.faces[i] = $root.cadompart.v0_2.FaceRef.fromObject(object.faces[i], long + 1);
                    }
                }
                if (object.angleRad != null)
                    message.angleRad = Number(object.angleRad);
                if (object.pullDirection != null) {
                    if (!$util.isObject(object.pullDirection))
                        throw TypeError(".cadompart.v0_2.DraftFeature.pullDirection: object expected");
                    message.pullDirection = $root.cadompart.v0_2.Vec3.fromObject(object.pullDirection, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a DraftFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {cadompart.v0_2.DraftFeature} message DraftFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DraftFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.faces = [];
                if (options.defaults) {
                    object.sideType = options.enums === String ? "DRAFT_SIDE_UNSPECIFIED" : 0;
                    object.neutralPlaneId = "";
                    object.angleRad = 0;
                    object.pullDirection = null;
                }
                if (message.sideType != null && Object.hasOwnProperty.call(message, "sideType"))
                    object.sideType = options.enums === String ? $root.cadompart.v0_2.DraftSide[message.sideType] === undefined ? message.sideType : $root.cadompart.v0_2.DraftSide[message.sideType] : message.sideType;
                if (message.neutralPlaneId != null && Object.hasOwnProperty.call(message, "neutralPlaneId"))
                    object.neutralPlaneId = message.neutralPlaneId;
                if (message.faces && message.faces.length) {
                    object.faces = [];
                    for (let j = 0; j < message.faces.length; ++j)
                        object.faces[j] = $root.cadompart.v0_2.FaceRef.toObject(message.faces[j], options, q + 1);
                }
                if (message.angleRad != null && Object.hasOwnProperty.call(message, "angleRad"))
                    object.angleRad = options.json && !isFinite(message.angleRad) ? String(message.angleRad) : message.angleRad;
                if (message.pullDirection != null && Object.hasOwnProperty.call(message, "pullDirection"))
                    object.pullDirection = $root.cadompart.v0_2.Vec3.toObject(message.pullDirection, options, q + 1);
                return object;
            };

            /**
             * Converts this DraftFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.DraftFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DraftFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DraftFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.DraftFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DraftFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.DraftFeature";
            };

            return DraftFeature;
        })();

        v0_2.RibFeature = (function() {

            /**
             * Properties of a RibFeature.
             * @memberof cadompart.v0_2
             * @interface IRibFeature
             * @property {string|null} [profileSketchId] RibFeature profileSketchId
             * @property {number|null} [thickness] RibFeature thickness
             * @property {boolean|null} [draft] RibFeature draft
             * @property {number|null} [draftAngleRad] RibFeature draftAngleRad
             */

            /**
             * Constructs a new RibFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a RibFeature.
             * @implements IRibFeature
             * @constructor
             * @param {cadompart.v0_2.IRibFeature=} [properties] Properties to set
             */
            function RibFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RibFeature profileSketchId.
             * @member {string} profileSketchId
             * @memberof cadompart.v0_2.RibFeature
             * @instance
             */
            RibFeature.prototype.profileSketchId = "";

            /**
             * RibFeature thickness.
             * @member {number} thickness
             * @memberof cadompart.v0_2.RibFeature
             * @instance
             */
            RibFeature.prototype.thickness = 0;

            /**
             * RibFeature draft.
             * @member {boolean} draft
             * @memberof cadompart.v0_2.RibFeature
             * @instance
             */
            RibFeature.prototype.draft = false;

            /**
             * RibFeature draftAngleRad.
             * @member {number} draftAngleRad
             * @memberof cadompart.v0_2.RibFeature
             * @instance
             */
            RibFeature.prototype.draftAngleRad = 0;

            /**
             * Creates a new RibFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {cadompart.v0_2.IRibFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.RibFeature} RibFeature instance
             */
            RibFeature.create = function create(properties) {
                return new RibFeature(properties);
            };

            /**
             * Encodes the specified RibFeature message. Does not implicitly {@link cadompart.v0_2.RibFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {cadompart.v0_2.IRibFeature} message RibFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RibFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.profileSketchId);
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.thickness);
                if (message.draft != null && Object.hasOwnProperty.call(message, "draft"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.draft);
                if (message.draftAngleRad != null && Object.hasOwnProperty.call(message, "draftAngleRad"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.draftAngleRad);
                return writer;
            };

            /**
             * Encodes the specified RibFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.RibFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {cadompart.v0_2.IRibFeature} message RibFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RibFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a RibFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.RibFeature} RibFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RibFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.RibFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.profileSketchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.thickness = reader.double();
                            break;
                        }
                    case 3: {
                            message.draft = reader.bool();
                            break;
                        }
                    case 4: {
                            message.draftAngleRad = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a RibFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.RibFeature} RibFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RibFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RibFeature message.
             * @function verify
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RibFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    if (!$util.isString(message.profileSketchId))
                        return "profileSketchId: string expected";
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    if (typeof message.thickness !== "number")
                        return "thickness: number expected";
                if (message.draft != null && Object.hasOwnProperty.call(message, "draft"))
                    if (typeof message.draft !== "boolean")
                        return "draft: boolean expected";
                if (message.draftAngleRad != null && Object.hasOwnProperty.call(message, "draftAngleRad"))
                    if (typeof message.draftAngleRad !== "number")
                        return "draftAngleRad: number expected";
                return null;
            };

            /**
             * Creates a RibFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.RibFeature} RibFeature
             */
            RibFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.RibFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.RibFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.RibFeature();
                if (object.profileSketchId != null)
                    message.profileSketchId = String(object.profileSketchId);
                if (object.thickness != null)
                    message.thickness = Number(object.thickness);
                if (object.draft != null)
                    message.draft = Boolean(object.draft);
                if (object.draftAngleRad != null)
                    message.draftAngleRad = Number(object.draftAngleRad);
                return message;
            };

            /**
             * Creates a plain object from a RibFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {cadompart.v0_2.RibFeature} message RibFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RibFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.profileSketchId = "";
                    object.thickness = 0;
                    object.draft = false;
                    object.draftAngleRad = 0;
                }
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    object.profileSketchId = message.profileSketchId;
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    object.thickness = options.json && !isFinite(message.thickness) ? String(message.thickness) : message.thickness;
                if (message.draft != null && Object.hasOwnProperty.call(message, "draft"))
                    object.draft = message.draft;
                if (message.draftAngleRad != null && Object.hasOwnProperty.call(message, "draftAngleRad"))
                    object.draftAngleRad = options.json && !isFinite(message.draftAngleRad) ? String(message.draftAngleRad) : message.draftAngleRad;
                return object;
            };

            /**
             * Converts this RibFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.RibFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RibFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RibFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.RibFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RibFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.RibFeature";
            };

            return RibFeature;
        })();

        v0_2.MirrorFeature = (function() {

            /**
             * Properties of a MirrorFeature.
             * @memberof cadompart.v0_2
             * @interface IMirrorFeature
             * @property {string|null} [sourceFeatureId] MirrorFeature sourceFeatureId
             * @property {string|null} [mirrorPlaneId] MirrorFeature mirrorPlaneId
             * @property {boolean|null} [merge] MirrorFeature merge
             * @property {boolean|null} [copy] MirrorFeature copy
             */

            /**
             * Constructs a new MirrorFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a MirrorFeature.
             * @implements IMirrorFeature
             * @constructor
             * @param {cadompart.v0_2.IMirrorFeature=} [properties] Properties to set
             */
            function MirrorFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MirrorFeature sourceFeatureId.
             * @member {string} sourceFeatureId
             * @memberof cadompart.v0_2.MirrorFeature
             * @instance
             */
            MirrorFeature.prototype.sourceFeatureId = "";

            /**
             * MirrorFeature mirrorPlaneId.
             * @member {string} mirrorPlaneId
             * @memberof cadompart.v0_2.MirrorFeature
             * @instance
             */
            MirrorFeature.prototype.mirrorPlaneId = "";

            /**
             * MirrorFeature merge.
             * @member {boolean} merge
             * @memberof cadompart.v0_2.MirrorFeature
             * @instance
             */
            MirrorFeature.prototype.merge = false;

            /**
             * MirrorFeature copy.
             * @member {boolean} copy
             * @memberof cadompart.v0_2.MirrorFeature
             * @instance
             */
            MirrorFeature.prototype.copy = false;

            /**
             * Creates a new MirrorFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {cadompart.v0_2.IMirrorFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.MirrorFeature} MirrorFeature instance
             */
            MirrorFeature.create = function create(properties) {
                return new MirrorFeature(properties);
            };

            /**
             * Encodes the specified MirrorFeature message. Does not implicitly {@link cadompart.v0_2.MirrorFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {cadompart.v0_2.IMirrorFeature} message MirrorFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MirrorFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceFeatureId);
                if (message.mirrorPlaneId != null && Object.hasOwnProperty.call(message, "mirrorPlaneId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.mirrorPlaneId);
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.merge);
                if (message.copy != null && Object.hasOwnProperty.call(message, "copy"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.copy);
                return writer;
            };

            /**
             * Encodes the specified MirrorFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.MirrorFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {cadompart.v0_2.IMirrorFeature} message MirrorFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MirrorFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a MirrorFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.MirrorFeature} MirrorFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MirrorFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.MirrorFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sourceFeatureId = reader.string();
                            break;
                        }
                    case 2: {
                            message.mirrorPlaneId = reader.string();
                            break;
                        }
                    case 3: {
                            message.merge = reader.bool();
                            break;
                        }
                    case 4: {
                            message.copy = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a MirrorFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.MirrorFeature} MirrorFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MirrorFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MirrorFeature message.
             * @function verify
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MirrorFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    if (!$util.isString(message.sourceFeatureId))
                        return "sourceFeatureId: string expected";
                if (message.mirrorPlaneId != null && Object.hasOwnProperty.call(message, "mirrorPlaneId"))
                    if (!$util.isString(message.mirrorPlaneId))
                        return "mirrorPlaneId: string expected";
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    if (typeof message.merge !== "boolean")
                        return "merge: boolean expected";
                if (message.copy != null && Object.hasOwnProperty.call(message, "copy"))
                    if (typeof message.copy !== "boolean")
                        return "copy: boolean expected";
                return null;
            };

            /**
             * Creates a MirrorFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.MirrorFeature} MirrorFeature
             */
            MirrorFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.MirrorFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.MirrorFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.MirrorFeature();
                if (object.sourceFeatureId != null)
                    message.sourceFeatureId = String(object.sourceFeatureId);
                if (object.mirrorPlaneId != null)
                    message.mirrorPlaneId = String(object.mirrorPlaneId);
                if (object.merge != null)
                    message.merge = Boolean(object.merge);
                if (object.copy != null)
                    message.copy = Boolean(object.copy);
                return message;
            };

            /**
             * Creates a plain object from a MirrorFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {cadompart.v0_2.MirrorFeature} message MirrorFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MirrorFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.sourceFeatureId = "";
                    object.mirrorPlaneId = "";
                    object.merge = false;
                    object.copy = false;
                }
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    object.sourceFeatureId = message.sourceFeatureId;
                if (message.mirrorPlaneId != null && Object.hasOwnProperty.call(message, "mirrorPlaneId"))
                    object.mirrorPlaneId = message.mirrorPlaneId;
                if (message.merge != null && Object.hasOwnProperty.call(message, "merge"))
                    object.merge = message.merge;
                if (message.copy != null && Object.hasOwnProperty.call(message, "copy"))
                    object.copy = message.copy;
                return object;
            };

            /**
             * Converts this MirrorFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.MirrorFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MirrorFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MirrorFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.MirrorFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MirrorFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.MirrorFeature";
            };

            return MirrorFeature;
        })();

        v0_2.PatternLinearFeature = (function() {

            /**
             * Properties of a PatternLinearFeature.
             * @memberof cadompart.v0_2
             * @interface IPatternLinearFeature
             * @property {string|null} [sourceFeatureId] PatternLinearFeature sourceFeatureId
             * @property {cadompart.v0_2.IVec3|null} [direction] PatternLinearFeature direction
             * @property {string|null} [directionEdgeId] PatternLinearFeature directionEdgeId
             * @property {number|null} [count] PatternLinearFeature count
             * @property {number|null} [spacing] PatternLinearFeature spacing
             * @property {boolean|null} [spacingIsTotalExtent] PatternLinearFeature spacingIsTotalExtent
             * @property {cadompart.v0_2.PatternInstanceCountMode|null} [countMode] PatternLinearFeature countMode
             * @property {Array.<number>|null} [skippedInstanceIndices] PatternLinearFeature skippedInstanceIndices
             */

            /**
             * Constructs a new PatternLinearFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a PatternLinearFeature.
             * @implements IPatternLinearFeature
             * @constructor
             * @param {cadompart.v0_2.IPatternLinearFeature=} [properties] Properties to set
             */
            function PatternLinearFeature(properties) {
                this.skippedInstanceIndices = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PatternLinearFeature sourceFeatureId.
             * @member {string} sourceFeatureId
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.sourceFeatureId = "";

            /**
             * PatternLinearFeature direction.
             * @member {cadompart.v0_2.IVec3|null|undefined} direction
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.direction = null;

            /**
             * PatternLinearFeature directionEdgeId.
             * @member {string} directionEdgeId
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.directionEdgeId = "";

            /**
             * PatternLinearFeature count.
             * @member {number} count
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.count = 0;

            /**
             * PatternLinearFeature spacing.
             * @member {number} spacing
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.spacing = 0;

            /**
             * PatternLinearFeature spacingIsTotalExtent.
             * @member {boolean} spacingIsTotalExtent
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.spacingIsTotalExtent = false;

            /**
             * PatternLinearFeature countMode.
             * @member {cadompart.v0_2.PatternInstanceCountMode} countMode
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.countMode = 0;

            /**
             * PatternLinearFeature skippedInstanceIndices.
             * @member {Array.<number>} skippedInstanceIndices
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             */
            PatternLinearFeature.prototype.skippedInstanceIndices = $util.emptyArray;

            /**
             * Creates a new PatternLinearFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {cadompart.v0_2.IPatternLinearFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.PatternLinearFeature} PatternLinearFeature instance
             */
            PatternLinearFeature.create = function create(properties) {
                return new PatternLinearFeature(properties);
            };

            /**
             * Encodes the specified PatternLinearFeature message. Does not implicitly {@link cadompart.v0_2.PatternLinearFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {cadompart.v0_2.IPatternLinearFeature} message PatternLinearFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PatternLinearFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceFeatureId);
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    $root.cadompart.v0_2.Vec3.encode(message.direction, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.directionEdgeId != null && Object.hasOwnProperty.call(message, "directionEdgeId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.directionEdgeId);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.count);
                if (message.spacing != null && Object.hasOwnProperty.call(message, "spacing"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.spacing);
                if (message.spacingIsTotalExtent != null && Object.hasOwnProperty.call(message, "spacingIsTotalExtent"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.spacingIsTotalExtent);
                if (message.countMode != null && Object.hasOwnProperty.call(message, "countMode"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.countMode);
                if (message.skippedInstanceIndices != null && message.skippedInstanceIndices.length) {
                    writer.uint32(/* id 8, wireType 2 =*/66).fork();
                    for (let i = 0; i < message.skippedInstanceIndices.length; ++i)
                        writer.uint32(message.skippedInstanceIndices[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified PatternLinearFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.PatternLinearFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {cadompart.v0_2.IPatternLinearFeature} message PatternLinearFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PatternLinearFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a PatternLinearFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.PatternLinearFeature} PatternLinearFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PatternLinearFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.PatternLinearFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sourceFeatureId = reader.string();
                            break;
                        }
                    case 2: {
                            message.direction = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.directionEdgeId = reader.string();
                            break;
                        }
                    case 4: {
                            message.count = reader.uint32();
                            break;
                        }
                    case 5: {
                            message.spacing = reader.double();
                            break;
                        }
                    case 6: {
                            message.spacingIsTotalExtent = reader.bool();
                            break;
                        }
                    case 7: {
                            message.countMode = reader.int32();
                            break;
                        }
                    case 8: {
                            if (!(message.skippedInstanceIndices && message.skippedInstanceIndices.length))
                                message.skippedInstanceIndices = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                if (end2 > reader.len)
                                    throw RangeError("index out of range");
                                reader.len = end2;
                                while (reader.pos < end2)
                                    message.skippedInstanceIndices.push(reader.uint32());
                                if (reader.pos !== end2)
                                    throw RangeError("index out of range");
                                reader.len = end;
                            } else
                                message.skippedInstanceIndices.push(reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a PatternLinearFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.PatternLinearFeature} PatternLinearFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PatternLinearFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PatternLinearFeature message.
             * @function verify
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PatternLinearFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    if (!$util.isString(message.sourceFeatureId))
                        return "sourceFeatureId: string expected";
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.direction, long + 1);
                    if (error)
                        return "direction." + error;
                }
                if (message.directionEdgeId != null && Object.hasOwnProperty.call(message, "directionEdgeId"))
                    if (!$util.isString(message.directionEdgeId))
                        return "directionEdgeId: string expected";
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    if (!$util.isInteger(message.count))
                        return "count: integer expected";
                if (message.spacing != null && Object.hasOwnProperty.call(message, "spacing"))
                    if (typeof message.spacing !== "number")
                        return "spacing: number expected";
                if (message.spacingIsTotalExtent != null && Object.hasOwnProperty.call(message, "spacingIsTotalExtent"))
                    if (typeof message.spacingIsTotalExtent !== "boolean")
                        return "spacingIsTotalExtent: boolean expected";
                if (message.countMode != null && Object.hasOwnProperty.call(message, "countMode"))
                    switch (message.countMode) {
                    default:
                        return "countMode: enum value expected";
                    case 0:
                        break;
                    }
                if (message.skippedInstanceIndices != null && Object.hasOwnProperty.call(message, "skippedInstanceIndices")) {
                    if (!Array.isArray(message.skippedInstanceIndices))
                        return "skippedInstanceIndices: array expected";
                    for (let i = 0; i < message.skippedInstanceIndices.length; ++i)
                        if (!$util.isInteger(message.skippedInstanceIndices[i]))
                            return "skippedInstanceIndices: integer[] expected";
                }
                return null;
            };

            /**
             * Creates a PatternLinearFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.PatternLinearFeature} PatternLinearFeature
             */
            PatternLinearFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.PatternLinearFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.PatternLinearFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.PatternLinearFeature();
                if (object.sourceFeatureId != null)
                    message.sourceFeatureId = String(object.sourceFeatureId);
                if (object.direction != null) {
                    if (!$util.isObject(object.direction))
                        throw TypeError(".cadompart.v0_2.PatternLinearFeature.direction: object expected");
                    message.direction = $root.cadompart.v0_2.Vec3.fromObject(object.direction, long + 1);
                }
                if (object.directionEdgeId != null)
                    message.directionEdgeId = String(object.directionEdgeId);
                if (object.count != null)
                    message.count = object.count >>> 0;
                if (object.spacing != null)
                    message.spacing = Number(object.spacing);
                if (object.spacingIsTotalExtent != null)
                    message.spacingIsTotalExtent = Boolean(object.spacingIsTotalExtent);
                switch (object.countMode) {
                default:
                    if (typeof object.countMode === "number") {
                        message.countMode = object.countMode;
                        break;
                    }
                    break;
                case "PATTERN_COUNT_TOTAL_INCLUDING_SOURCE":
                case 0:
                    message.countMode = 0;
                    break;
                }
                if (object.skippedInstanceIndices) {
                    if (!Array.isArray(object.skippedInstanceIndices))
                        throw TypeError(".cadompart.v0_2.PatternLinearFeature.skippedInstanceIndices: array expected");
                    message.skippedInstanceIndices = [];
                    for (let i = 0; i < object.skippedInstanceIndices.length; ++i)
                        message.skippedInstanceIndices[i] = object.skippedInstanceIndices[i] >>> 0;
                }
                return message;
            };

            /**
             * Creates a plain object from a PatternLinearFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {cadompart.v0_2.PatternLinearFeature} message PatternLinearFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PatternLinearFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.skippedInstanceIndices = [];
                if (options.defaults) {
                    object.sourceFeatureId = "";
                    object.direction = null;
                    object.directionEdgeId = "";
                    object.count = 0;
                    object.spacing = 0;
                    object.spacingIsTotalExtent = false;
                    object.countMode = options.enums === String ? "PATTERN_COUNT_TOTAL_INCLUDING_SOURCE" : 0;
                }
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    object.sourceFeatureId = message.sourceFeatureId;
                if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                    object.direction = $root.cadompart.v0_2.Vec3.toObject(message.direction, options, q + 1);
                if (message.directionEdgeId != null && Object.hasOwnProperty.call(message, "directionEdgeId"))
                    object.directionEdgeId = message.directionEdgeId;
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    object.count = message.count;
                if (message.spacing != null && Object.hasOwnProperty.call(message, "spacing"))
                    object.spacing = options.json && !isFinite(message.spacing) ? String(message.spacing) : message.spacing;
                if (message.spacingIsTotalExtent != null && Object.hasOwnProperty.call(message, "spacingIsTotalExtent"))
                    object.spacingIsTotalExtent = message.spacingIsTotalExtent;
                if (message.countMode != null && Object.hasOwnProperty.call(message, "countMode"))
                    object.countMode = options.enums === String ? $root.cadompart.v0_2.PatternInstanceCountMode[message.countMode] === undefined ? message.countMode : $root.cadompart.v0_2.PatternInstanceCountMode[message.countMode] : message.countMode;
                if (message.skippedInstanceIndices && message.skippedInstanceIndices.length) {
                    object.skippedInstanceIndices = [];
                    for (let j = 0; j < message.skippedInstanceIndices.length; ++j)
                        object.skippedInstanceIndices[j] = message.skippedInstanceIndices[j];
                }
                return object;
            };

            /**
             * Converts this PatternLinearFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PatternLinearFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PatternLinearFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.PatternLinearFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PatternLinearFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.PatternLinearFeature";
            };

            return PatternLinearFeature;
        })();

        v0_2.PatternCircularFeature = (function() {

            /**
             * Properties of a PatternCircularFeature.
             * @memberof cadompart.v0_2
             * @interface IPatternCircularFeature
             * @property {string|null} [sourceFeatureId] PatternCircularFeature sourceFeatureId
             * @property {cadompart.v0_2.IVec3|null} [axisOrigin] PatternCircularFeature axisOrigin
             * @property {cadompart.v0_2.IVec3|null} [axisDirection] PatternCircularFeature axisDirection
             * @property {string|null} [datumAxisId] PatternCircularFeature datumAxisId
             * @property {number|null} [count] PatternCircularFeature count
             * @property {number|null} [angleSpanRad] PatternCircularFeature angleSpanRad
             * @property {boolean|null} [equalSpacing] PatternCircularFeature equalSpacing
             * @property {cadompart.v0_2.PatternInstanceCountMode|null} [countMode] PatternCircularFeature countMode
             * @property {Array.<number>|null} [skippedInstanceIndices] PatternCircularFeature skippedInstanceIndices
             */

            /**
             * Constructs a new PatternCircularFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a PatternCircularFeature.
             * @implements IPatternCircularFeature
             * @constructor
             * @param {cadompart.v0_2.IPatternCircularFeature=} [properties] Properties to set
             */
            function PatternCircularFeature(properties) {
                this.skippedInstanceIndices = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PatternCircularFeature sourceFeatureId.
             * @member {string} sourceFeatureId
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.sourceFeatureId = "";

            /**
             * PatternCircularFeature axisOrigin.
             * @member {cadompart.v0_2.IVec3|null|undefined} axisOrigin
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.axisOrigin = null;

            /**
             * PatternCircularFeature axisDirection.
             * @member {cadompart.v0_2.IVec3|null|undefined} axisDirection
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.axisDirection = null;

            /**
             * PatternCircularFeature datumAxisId.
             * @member {string} datumAxisId
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.datumAxisId = "";

            /**
             * PatternCircularFeature count.
             * @member {number} count
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.count = 0;

            /**
             * PatternCircularFeature angleSpanRad.
             * @member {number} angleSpanRad
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.angleSpanRad = 0;

            /**
             * PatternCircularFeature equalSpacing.
             * @member {boolean} equalSpacing
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.equalSpacing = false;

            /**
             * PatternCircularFeature countMode.
             * @member {cadompart.v0_2.PatternInstanceCountMode} countMode
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.countMode = 0;

            /**
             * PatternCircularFeature skippedInstanceIndices.
             * @member {Array.<number>} skippedInstanceIndices
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             */
            PatternCircularFeature.prototype.skippedInstanceIndices = $util.emptyArray;

            /**
             * Creates a new PatternCircularFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {cadompart.v0_2.IPatternCircularFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.PatternCircularFeature} PatternCircularFeature instance
             */
            PatternCircularFeature.create = function create(properties) {
                return new PatternCircularFeature(properties);
            };

            /**
             * Encodes the specified PatternCircularFeature message. Does not implicitly {@link cadompart.v0_2.PatternCircularFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {cadompart.v0_2.IPatternCircularFeature} message PatternCircularFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PatternCircularFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceFeatureId);
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin"))
                    $root.cadompart.v0_2.Vec3.encode(message.axisOrigin, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection"))
                    $root.cadompart.v0_2.Vec3.encode(message.axisDirection, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.datumAxisId != null && Object.hasOwnProperty.call(message, "datumAxisId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.datumAxisId);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.count);
                if (message.angleSpanRad != null && Object.hasOwnProperty.call(message, "angleSpanRad"))
                    writer.uint32(/* id 6, wireType 1 =*/49).double(message.angleSpanRad);
                if (message.equalSpacing != null && Object.hasOwnProperty.call(message, "equalSpacing"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.equalSpacing);
                if (message.countMode != null && Object.hasOwnProperty.call(message, "countMode"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.countMode);
                if (message.skippedInstanceIndices != null && message.skippedInstanceIndices.length) {
                    writer.uint32(/* id 9, wireType 2 =*/74).fork();
                    for (let i = 0; i < message.skippedInstanceIndices.length; ++i)
                        writer.uint32(message.skippedInstanceIndices[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified PatternCircularFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.PatternCircularFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {cadompart.v0_2.IPatternCircularFeature} message PatternCircularFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PatternCircularFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a PatternCircularFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.PatternCircularFeature} PatternCircularFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PatternCircularFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.PatternCircularFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.sourceFeatureId = reader.string();
                            break;
                        }
                    case 2: {
                            message.axisOrigin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.axisDirection = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.datumAxisId = reader.string();
                            break;
                        }
                    case 5: {
                            message.count = reader.uint32();
                            break;
                        }
                    case 6: {
                            message.angleSpanRad = reader.double();
                            break;
                        }
                    case 7: {
                            message.equalSpacing = reader.bool();
                            break;
                        }
                    case 8: {
                            message.countMode = reader.int32();
                            break;
                        }
                    case 9: {
                            if (!(message.skippedInstanceIndices && message.skippedInstanceIndices.length))
                                message.skippedInstanceIndices = [];
                            if ((tag & 7) === 2) {
                                let end2 = reader.uint32() + reader.pos;
                                if (end2 > reader.len)
                                    throw RangeError("index out of range");
                                reader.len = end2;
                                while (reader.pos < end2)
                                    message.skippedInstanceIndices.push(reader.uint32());
                                if (reader.pos !== end2)
                                    throw RangeError("index out of range");
                                reader.len = end;
                            } else
                                message.skippedInstanceIndices.push(reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a PatternCircularFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.PatternCircularFeature} PatternCircularFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PatternCircularFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PatternCircularFeature message.
             * @function verify
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PatternCircularFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    if (!$util.isString(message.sourceFeatureId))
                        return "sourceFeatureId: string expected";
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axisOrigin, long + 1);
                    if (error)
                        return "axisOrigin." + error;
                }
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axisDirection, long + 1);
                    if (error)
                        return "axisDirection." + error;
                }
                if (message.datumAxisId != null && Object.hasOwnProperty.call(message, "datumAxisId"))
                    if (!$util.isString(message.datumAxisId))
                        return "datumAxisId: string expected";
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    if (!$util.isInteger(message.count))
                        return "count: integer expected";
                if (message.angleSpanRad != null && Object.hasOwnProperty.call(message, "angleSpanRad"))
                    if (typeof message.angleSpanRad !== "number")
                        return "angleSpanRad: number expected";
                if (message.equalSpacing != null && Object.hasOwnProperty.call(message, "equalSpacing"))
                    if (typeof message.equalSpacing !== "boolean")
                        return "equalSpacing: boolean expected";
                if (message.countMode != null && Object.hasOwnProperty.call(message, "countMode"))
                    switch (message.countMode) {
                    default:
                        return "countMode: enum value expected";
                    case 0:
                        break;
                    }
                if (message.skippedInstanceIndices != null && Object.hasOwnProperty.call(message, "skippedInstanceIndices")) {
                    if (!Array.isArray(message.skippedInstanceIndices))
                        return "skippedInstanceIndices: array expected";
                    for (let i = 0; i < message.skippedInstanceIndices.length; ++i)
                        if (!$util.isInteger(message.skippedInstanceIndices[i]))
                            return "skippedInstanceIndices: integer[] expected";
                }
                return null;
            };

            /**
             * Creates a PatternCircularFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.PatternCircularFeature} PatternCircularFeature
             */
            PatternCircularFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.PatternCircularFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.PatternCircularFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.PatternCircularFeature();
                if (object.sourceFeatureId != null)
                    message.sourceFeatureId = String(object.sourceFeatureId);
                if (object.axisOrigin != null) {
                    if (!$util.isObject(object.axisOrigin))
                        throw TypeError(".cadompart.v0_2.PatternCircularFeature.axisOrigin: object expected");
                    message.axisOrigin = $root.cadompart.v0_2.Vec3.fromObject(object.axisOrigin, long + 1);
                }
                if (object.axisDirection != null) {
                    if (!$util.isObject(object.axisDirection))
                        throw TypeError(".cadompart.v0_2.PatternCircularFeature.axisDirection: object expected");
                    message.axisDirection = $root.cadompart.v0_2.Vec3.fromObject(object.axisDirection, long + 1);
                }
                if (object.datumAxisId != null)
                    message.datumAxisId = String(object.datumAxisId);
                if (object.count != null)
                    message.count = object.count >>> 0;
                if (object.angleSpanRad != null)
                    message.angleSpanRad = Number(object.angleSpanRad);
                if (object.equalSpacing != null)
                    message.equalSpacing = Boolean(object.equalSpacing);
                switch (object.countMode) {
                default:
                    if (typeof object.countMode === "number") {
                        message.countMode = object.countMode;
                        break;
                    }
                    break;
                case "PATTERN_COUNT_TOTAL_INCLUDING_SOURCE":
                case 0:
                    message.countMode = 0;
                    break;
                }
                if (object.skippedInstanceIndices) {
                    if (!Array.isArray(object.skippedInstanceIndices))
                        throw TypeError(".cadompart.v0_2.PatternCircularFeature.skippedInstanceIndices: array expected");
                    message.skippedInstanceIndices = [];
                    for (let i = 0; i < object.skippedInstanceIndices.length; ++i)
                        message.skippedInstanceIndices[i] = object.skippedInstanceIndices[i] >>> 0;
                }
                return message;
            };

            /**
             * Creates a plain object from a PatternCircularFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {cadompart.v0_2.PatternCircularFeature} message PatternCircularFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PatternCircularFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.skippedInstanceIndices = [];
                if (options.defaults) {
                    object.sourceFeatureId = "";
                    object.axisOrigin = null;
                    object.axisDirection = null;
                    object.datumAxisId = "";
                    object.count = 0;
                    object.angleSpanRad = 0;
                    object.equalSpacing = false;
                    object.countMode = options.enums === String ? "PATTERN_COUNT_TOTAL_INCLUDING_SOURCE" : 0;
                }
                if (message.sourceFeatureId != null && Object.hasOwnProperty.call(message, "sourceFeatureId"))
                    object.sourceFeatureId = message.sourceFeatureId;
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin"))
                    object.axisOrigin = $root.cadompart.v0_2.Vec3.toObject(message.axisOrigin, options, q + 1);
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection"))
                    object.axisDirection = $root.cadompart.v0_2.Vec3.toObject(message.axisDirection, options, q + 1);
                if (message.datumAxisId != null && Object.hasOwnProperty.call(message, "datumAxisId"))
                    object.datumAxisId = message.datumAxisId;
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    object.count = message.count;
                if (message.angleSpanRad != null && Object.hasOwnProperty.call(message, "angleSpanRad"))
                    object.angleSpanRad = options.json && !isFinite(message.angleSpanRad) ? String(message.angleSpanRad) : message.angleSpanRad;
                if (message.equalSpacing != null && Object.hasOwnProperty.call(message, "equalSpacing"))
                    object.equalSpacing = message.equalSpacing;
                if (message.countMode != null && Object.hasOwnProperty.call(message, "countMode"))
                    object.countMode = options.enums === String ? $root.cadompart.v0_2.PatternInstanceCountMode[message.countMode] === undefined ? message.countMode : $root.cadompart.v0_2.PatternInstanceCountMode[message.countMode] : message.countMode;
                if (message.skippedInstanceIndices && message.skippedInstanceIndices.length) {
                    object.skippedInstanceIndices = [];
                    for (let j = 0; j < message.skippedInstanceIndices.length; ++j)
                        object.skippedInstanceIndices[j] = message.skippedInstanceIndices[j];
                }
                return object;
            };

            /**
             * Converts this PatternCircularFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PatternCircularFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PatternCircularFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.PatternCircularFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PatternCircularFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.PatternCircularFeature";
            };

            return PatternCircularFeature;
        })();

        v0_2.BooleanFeature = (function() {

            /**
             * Properties of a BooleanFeature.
             * @memberof cadompart.v0_2
             * @interface IBooleanFeature
             * @property {cadompart.v0_2.BooleanOp|null} [op] BooleanFeature op
             * @property {string|null} [toolFeatureId] BooleanFeature toolFeatureId
             * @property {string|null} [toolBodyId] BooleanFeature toolBodyId
             * @property {string|null} [targetBodyId] BooleanFeature targetBodyId
             */

            /**
             * Constructs a new BooleanFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a BooleanFeature.
             * @implements IBooleanFeature
             * @constructor
             * @param {cadompart.v0_2.IBooleanFeature=} [properties] Properties to set
             */
            function BooleanFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BooleanFeature op.
             * @member {cadompart.v0_2.BooleanOp} op
             * @memberof cadompart.v0_2.BooleanFeature
             * @instance
             */
            BooleanFeature.prototype.op = 0;

            /**
             * BooleanFeature toolFeatureId.
             * @member {string} toolFeatureId
             * @memberof cadompart.v0_2.BooleanFeature
             * @instance
             */
            BooleanFeature.prototype.toolFeatureId = "";

            /**
             * BooleanFeature toolBodyId.
             * @member {string} toolBodyId
             * @memberof cadompart.v0_2.BooleanFeature
             * @instance
             */
            BooleanFeature.prototype.toolBodyId = "";

            /**
             * BooleanFeature targetBodyId.
             * @member {string} targetBodyId
             * @memberof cadompart.v0_2.BooleanFeature
             * @instance
             */
            BooleanFeature.prototype.targetBodyId = "";

            /**
             * Creates a new BooleanFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {cadompart.v0_2.IBooleanFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.BooleanFeature} BooleanFeature instance
             */
            BooleanFeature.create = function create(properties) {
                return new BooleanFeature(properties);
            };

            /**
             * Encodes the specified BooleanFeature message. Does not implicitly {@link cadompart.v0_2.BooleanFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {cadompart.v0_2.IBooleanFeature} message BooleanFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BooleanFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.op != null && Object.hasOwnProperty.call(message, "op"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.op);
                if (message.toolFeatureId != null && Object.hasOwnProperty.call(message, "toolFeatureId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.toolFeatureId);
                if (message.toolBodyId != null && Object.hasOwnProperty.call(message, "toolBodyId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.toolBodyId);
                if (message.targetBodyId != null && Object.hasOwnProperty.call(message, "targetBodyId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.targetBodyId);
                return writer;
            };

            /**
             * Encodes the specified BooleanFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.BooleanFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {cadompart.v0_2.IBooleanFeature} message BooleanFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BooleanFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a BooleanFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.BooleanFeature} BooleanFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BooleanFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.BooleanFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.op = reader.int32();
                            break;
                        }
                    case 2: {
                            message.toolFeatureId = reader.string();
                            break;
                        }
                    case 3: {
                            message.toolBodyId = reader.string();
                            break;
                        }
                    case 4: {
                            message.targetBodyId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a BooleanFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.BooleanFeature} BooleanFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BooleanFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BooleanFeature message.
             * @function verify
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BooleanFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.op != null && Object.hasOwnProperty.call(message, "op"))
                    switch (message.op) {
                    default:
                        return "op: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.toolFeatureId != null && Object.hasOwnProperty.call(message, "toolFeatureId"))
                    if (!$util.isString(message.toolFeatureId))
                        return "toolFeatureId: string expected";
                if (message.toolBodyId != null && Object.hasOwnProperty.call(message, "toolBodyId"))
                    if (!$util.isString(message.toolBodyId))
                        return "toolBodyId: string expected";
                if (message.targetBodyId != null && Object.hasOwnProperty.call(message, "targetBodyId"))
                    if (!$util.isString(message.targetBodyId))
                        return "targetBodyId: string expected";
                return null;
            };

            /**
             * Creates a BooleanFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.BooleanFeature} BooleanFeature
             */
            BooleanFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.BooleanFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.BooleanFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.BooleanFeature();
                switch (object.op) {
                default:
                    if (typeof object.op === "number") {
                        message.op = object.op;
                        break;
                    }
                    break;
                case "BOOLEAN_OP_UNSPECIFIED":
                case 0:
                    message.op = 0;
                    break;
                case "BOOLEAN_OP_UNION":
                case 1:
                    message.op = 1;
                    break;
                case "BOOLEAN_OP_SUBTRACT":
                case 2:
                    message.op = 2;
                    break;
                case "BOOLEAN_OP_INTERSECT":
                case 3:
                    message.op = 3;
                    break;
                }
                if (object.toolFeatureId != null)
                    message.toolFeatureId = String(object.toolFeatureId);
                if (object.toolBodyId != null)
                    message.toolBodyId = String(object.toolBodyId);
                if (object.targetBodyId != null)
                    message.targetBodyId = String(object.targetBodyId);
                return message;
            };

            /**
             * Creates a plain object from a BooleanFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {cadompart.v0_2.BooleanFeature} message BooleanFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BooleanFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.op = options.enums === String ? "BOOLEAN_OP_UNSPECIFIED" : 0;
                    object.toolFeatureId = "";
                    object.toolBodyId = "";
                    object.targetBodyId = "";
                }
                if (message.op != null && Object.hasOwnProperty.call(message, "op"))
                    object.op = options.enums === String ? $root.cadompart.v0_2.BooleanOp[message.op] === undefined ? message.op : $root.cadompart.v0_2.BooleanOp[message.op] : message.op;
                if (message.toolFeatureId != null && Object.hasOwnProperty.call(message, "toolFeatureId"))
                    object.toolFeatureId = message.toolFeatureId;
                if (message.toolBodyId != null && Object.hasOwnProperty.call(message, "toolBodyId"))
                    object.toolBodyId = message.toolBodyId;
                if (message.targetBodyId != null && Object.hasOwnProperty.call(message, "targetBodyId"))
                    object.targetBodyId = message.targetBodyId;
                return object;
            };

            /**
             * Converts this BooleanFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.BooleanFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BooleanFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BooleanFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.BooleanFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BooleanFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.BooleanFeature";
            };

            return BooleanFeature;
        })();

        v0_2.ThickenFeature = (function() {

            /**
             * Properties of a ThickenFeature.
             * @memberof cadompart.v0_2
             * @interface IThickenFeature
             * @property {string|null} [surfaceFeatureId] ThickenFeature surfaceFeatureId
             * @property {number|null} [thickness] ThickenFeature thickness
             * @property {boolean|null} [bothSides] ThickenFeature bothSides
             */

            /**
             * Constructs a new ThickenFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a ThickenFeature.
             * @implements IThickenFeature
             * @constructor
             * @param {cadompart.v0_2.IThickenFeature=} [properties] Properties to set
             */
            function ThickenFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ThickenFeature surfaceFeatureId.
             * @member {string} surfaceFeatureId
             * @memberof cadompart.v0_2.ThickenFeature
             * @instance
             */
            ThickenFeature.prototype.surfaceFeatureId = "";

            /**
             * ThickenFeature thickness.
             * @member {number} thickness
             * @memberof cadompart.v0_2.ThickenFeature
             * @instance
             */
            ThickenFeature.prototype.thickness = 0;

            /**
             * ThickenFeature bothSides.
             * @member {boolean} bothSides
             * @memberof cadompart.v0_2.ThickenFeature
             * @instance
             */
            ThickenFeature.prototype.bothSides = false;

            /**
             * Creates a new ThickenFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {cadompart.v0_2.IThickenFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.ThickenFeature} ThickenFeature instance
             */
            ThickenFeature.create = function create(properties) {
                return new ThickenFeature(properties);
            };

            /**
             * Encodes the specified ThickenFeature message. Does not implicitly {@link cadompart.v0_2.ThickenFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {cadompart.v0_2.IThickenFeature} message ThickenFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThickenFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.surfaceFeatureId != null && Object.hasOwnProperty.call(message, "surfaceFeatureId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.surfaceFeatureId);
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.thickness);
                if (message.bothSides != null && Object.hasOwnProperty.call(message, "bothSides"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.bothSides);
                return writer;
            };

            /**
             * Encodes the specified ThickenFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ThickenFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {cadompart.v0_2.IThickenFeature} message ThickenFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThickenFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ThickenFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ThickenFeature} ThickenFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThickenFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ThickenFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.surfaceFeatureId = reader.string();
                            break;
                        }
                    case 2: {
                            message.thickness = reader.double();
                            break;
                        }
                    case 3: {
                            message.bothSides = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a ThickenFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ThickenFeature} ThickenFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThickenFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ThickenFeature message.
             * @function verify
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ThickenFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.surfaceFeatureId != null && Object.hasOwnProperty.call(message, "surfaceFeatureId"))
                    if (!$util.isString(message.surfaceFeatureId))
                        return "surfaceFeatureId: string expected";
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    if (typeof message.thickness !== "number")
                        return "thickness: number expected";
                if (message.bothSides != null && Object.hasOwnProperty.call(message, "bothSides"))
                    if (typeof message.bothSides !== "boolean")
                        return "bothSides: boolean expected";
                return null;
            };

            /**
             * Creates a ThickenFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ThickenFeature} ThickenFeature
             */
            ThickenFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ThickenFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ThickenFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ThickenFeature();
                if (object.surfaceFeatureId != null)
                    message.surfaceFeatureId = String(object.surfaceFeatureId);
                if (object.thickness != null)
                    message.thickness = Number(object.thickness);
                if (object.bothSides != null)
                    message.bothSides = Boolean(object.bothSides);
                return message;
            };

            /**
             * Creates a plain object from a ThickenFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {cadompart.v0_2.ThickenFeature} message ThickenFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ThickenFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.surfaceFeatureId = "";
                    object.thickness = 0;
                    object.bothSides = false;
                }
                if (message.surfaceFeatureId != null && Object.hasOwnProperty.call(message, "surfaceFeatureId"))
                    object.surfaceFeatureId = message.surfaceFeatureId;
                if (message.thickness != null && Object.hasOwnProperty.call(message, "thickness"))
                    object.thickness = options.json && !isFinite(message.thickness) ? String(message.thickness) : message.thickness;
                if (message.bothSides != null && Object.hasOwnProperty.call(message, "bothSides"))
                    object.bothSides = message.bothSides;
                return object;
            };

            /**
             * Converts this ThickenFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ThickenFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ThickenFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ThickenFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ThickenFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ThickenFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ThickenFeature";
            };

            return ThickenFeature;
        })();

        v0_2.OffsetFacesFeature = (function() {

            /**
             * Properties of an OffsetFacesFeature.
             * @memberof cadompart.v0_2
             * @interface IOffsetFacesFeature
             * @property {Array.<cadompart.v0_2.IFaceRef>|null} [faces] OffsetFacesFeature faces
             * @property {number|null} [distance] OffsetFacesFeature distance
             */

            /**
             * Constructs a new OffsetFacesFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents an OffsetFacesFeature.
             * @implements IOffsetFacesFeature
             * @constructor
             * @param {cadompart.v0_2.IOffsetFacesFeature=} [properties] Properties to set
             */
            function OffsetFacesFeature(properties) {
                this.faces = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OffsetFacesFeature faces.
             * @member {Array.<cadompart.v0_2.IFaceRef>} faces
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @instance
             */
            OffsetFacesFeature.prototype.faces = $util.emptyArray;

            /**
             * OffsetFacesFeature distance.
             * @member {number} distance
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @instance
             */
            OffsetFacesFeature.prototype.distance = 0;

            /**
             * Creates a new OffsetFacesFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {cadompart.v0_2.IOffsetFacesFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.OffsetFacesFeature} OffsetFacesFeature instance
             */
            OffsetFacesFeature.create = function create(properties) {
                return new OffsetFacesFeature(properties);
            };

            /**
             * Encodes the specified OffsetFacesFeature message. Does not implicitly {@link cadompart.v0_2.OffsetFacesFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {cadompart.v0_2.IOffsetFacesFeature} message OffsetFacesFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OffsetFacesFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.faces != null && message.faces.length)
                    for (let i = 0; i < message.faces.length; ++i)
                        $root.cadompart.v0_2.FaceRef.encode(message.faces[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.distance);
                return writer;
            };

            /**
             * Encodes the specified OffsetFacesFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.OffsetFacesFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {cadompart.v0_2.IOffsetFacesFeature} message OffsetFacesFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OffsetFacesFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes an OffsetFacesFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.OffsetFacesFeature} OffsetFacesFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OffsetFacesFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.OffsetFacesFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.faces && message.faces.length))
                                message.faces = [];
                            message.faces.push($root.cadompart.v0_2.FaceRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.distance = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes an OffsetFacesFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.OffsetFacesFeature} OffsetFacesFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OffsetFacesFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OffsetFacesFeature message.
             * @function verify
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OffsetFacesFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.faces != null && Object.hasOwnProperty.call(message, "faces")) {
                    if (!Array.isArray(message.faces))
                        return "faces: array expected";
                    for (let i = 0; i < message.faces.length; ++i) {
                        let error = $root.cadompart.v0_2.FaceRef.verify(message.faces[i], long + 1);
                        if (error)
                            return "faces." + error;
                    }
                }
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    if (typeof message.distance !== "number")
                        return "distance: number expected";
                return null;
            };

            /**
             * Creates an OffsetFacesFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.OffsetFacesFeature} OffsetFacesFeature
             */
            OffsetFacesFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.OffsetFacesFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.OffsetFacesFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.OffsetFacesFeature();
                if (object.faces) {
                    if (!Array.isArray(object.faces))
                        throw TypeError(".cadompart.v0_2.OffsetFacesFeature.faces: array expected");
                    message.faces = [];
                    for (let i = 0; i < object.faces.length; ++i) {
                        if (!$util.isObject(object.faces[i]))
                            throw TypeError(".cadompart.v0_2.OffsetFacesFeature.faces: object expected");
                        message.faces[i] = $root.cadompart.v0_2.FaceRef.fromObject(object.faces[i], long + 1);
                    }
                }
                if (object.distance != null)
                    message.distance = Number(object.distance);
                return message;
            };

            /**
             * Creates a plain object from an OffsetFacesFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {cadompart.v0_2.OffsetFacesFeature} message OffsetFacesFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OffsetFacesFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.faces = [];
                if (options.defaults)
                    object.distance = 0;
                if (message.faces && message.faces.length) {
                    object.faces = [];
                    for (let j = 0; j < message.faces.length; ++j)
                        object.faces[j] = $root.cadompart.v0_2.FaceRef.toObject(message.faces[j], options, q + 1);
                }
                if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                    object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
                return object;
            };

            /**
             * Converts this OffsetFacesFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OffsetFacesFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for OffsetFacesFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.OffsetFacesFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            OffsetFacesFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.OffsetFacesFeature";
            };

            return OffsetFacesFeature;
        })();

        v0_2.MoveFaceFeature = (function() {

            /**
             * Properties of a MoveFaceFeature.
             * @memberof cadompart.v0_2
             * @interface IMoveFaceFeature
             * @property {Array.<cadompart.v0_2.IFaceRef>|null} [faces] MoveFaceFeature faces
             * @property {cadompart.v0_2.IVec3|null} [translation] MoveFaceFeature translation
             * @property {cadompart.v0_2.IVec3|null} [rotationAxisOrigin] MoveFaceFeature rotationAxisOrigin
             * @property {cadompart.v0_2.IVec3|null} [rotationAxisDirection] MoveFaceFeature rotationAxisDirection
             * @property {number|null} [rotationAngleRad] MoveFaceFeature rotationAngleRad
             */

            /**
             * Constructs a new MoveFaceFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a MoveFaceFeature.
             * @implements IMoveFaceFeature
             * @constructor
             * @param {cadompart.v0_2.IMoveFaceFeature=} [properties] Properties to set
             */
            function MoveFaceFeature(properties) {
                this.faces = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MoveFaceFeature faces.
             * @member {Array.<cadompart.v0_2.IFaceRef>} faces
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @instance
             */
            MoveFaceFeature.prototype.faces = $util.emptyArray;

            /**
             * MoveFaceFeature translation.
             * @member {cadompart.v0_2.IVec3|null|undefined} translation
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @instance
             */
            MoveFaceFeature.prototype.translation = null;

            /**
             * MoveFaceFeature rotationAxisOrigin.
             * @member {cadompart.v0_2.IVec3|null|undefined} rotationAxisOrigin
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @instance
             */
            MoveFaceFeature.prototype.rotationAxisOrigin = null;

            /**
             * MoveFaceFeature rotationAxisDirection.
             * @member {cadompart.v0_2.IVec3|null|undefined} rotationAxisDirection
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @instance
             */
            MoveFaceFeature.prototype.rotationAxisDirection = null;

            /**
             * MoveFaceFeature rotationAngleRad.
             * @member {number|null|undefined} rotationAngleRad
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @instance
             */
            MoveFaceFeature.prototype.rotationAngleRad = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(MoveFaceFeature.prototype, "_rotationAxisOrigin", {
                get: $util.oneOfGetter($oneOfFields = ["rotationAxisOrigin"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(MoveFaceFeature.prototype, "_rotationAxisDirection", {
                get: $util.oneOfGetter($oneOfFields = ["rotationAxisDirection"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(MoveFaceFeature.prototype, "_rotationAngleRad", {
                get: $util.oneOfGetter($oneOfFields = ["rotationAngleRad"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new MoveFaceFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {cadompart.v0_2.IMoveFaceFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.MoveFaceFeature} MoveFaceFeature instance
             */
            MoveFaceFeature.create = function create(properties) {
                return new MoveFaceFeature(properties);
            };

            /**
             * Encodes the specified MoveFaceFeature message. Does not implicitly {@link cadompart.v0_2.MoveFaceFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {cadompart.v0_2.IMoveFaceFeature} message MoveFaceFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MoveFaceFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.faces != null && message.faces.length)
                    for (let i = 0; i < message.faces.length; ++i)
                        $root.cadompart.v0_2.FaceRef.encode(message.faces[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.translation != null && Object.hasOwnProperty.call(message, "translation"))
                    $root.cadompart.v0_2.Vec3.encode(message.translation, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.rotationAxisOrigin != null && Object.hasOwnProperty.call(message, "rotationAxisOrigin"))
                    $root.cadompart.v0_2.Vec3.encode(message.rotationAxisOrigin, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.rotationAxisDirection != null && Object.hasOwnProperty.call(message, "rotationAxisDirection"))
                    $root.cadompart.v0_2.Vec3.encode(message.rotationAxisDirection, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                if (message.rotationAngleRad != null && Object.hasOwnProperty.call(message, "rotationAngleRad"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.rotationAngleRad);
                return writer;
            };

            /**
             * Encodes the specified MoveFaceFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.MoveFaceFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {cadompart.v0_2.IMoveFaceFeature} message MoveFaceFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MoveFaceFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a MoveFaceFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.MoveFaceFeature} MoveFaceFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MoveFaceFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.MoveFaceFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.faces && message.faces.length))
                                message.faces = [];
                            message.faces.push($root.cadompart.v0_2.FaceRef.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.translation = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.rotationAxisOrigin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.rotationAxisDirection = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 5: {
                            message.rotationAngleRad = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a MoveFaceFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.MoveFaceFeature} MoveFaceFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MoveFaceFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MoveFaceFeature message.
             * @function verify
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MoveFaceFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.faces != null && Object.hasOwnProperty.call(message, "faces")) {
                    if (!Array.isArray(message.faces))
                        return "faces: array expected";
                    for (let i = 0; i < message.faces.length; ++i) {
                        let error = $root.cadompart.v0_2.FaceRef.verify(message.faces[i], long + 1);
                        if (error)
                            return "faces." + error;
                    }
                }
                if (message.translation != null && Object.hasOwnProperty.call(message, "translation")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.translation, long + 1);
                    if (error)
                        return "translation." + error;
                }
                if (message.rotationAxisOrigin != null && Object.hasOwnProperty.call(message, "rotationAxisOrigin")) {
                    properties._rotationAxisOrigin = 1;
                    {
                        let error = $root.cadompart.v0_2.Vec3.verify(message.rotationAxisOrigin, long + 1);
                        if (error)
                            return "rotationAxisOrigin." + error;
                    }
                }
                if (message.rotationAxisDirection != null && Object.hasOwnProperty.call(message, "rotationAxisDirection")) {
                    properties._rotationAxisDirection = 1;
                    {
                        let error = $root.cadompart.v0_2.Vec3.verify(message.rotationAxisDirection, long + 1);
                        if (error)
                            return "rotationAxisDirection." + error;
                    }
                }
                if (message.rotationAngleRad != null && Object.hasOwnProperty.call(message, "rotationAngleRad")) {
                    properties._rotationAngleRad = 1;
                    if (typeof message.rotationAngleRad !== "number")
                        return "rotationAngleRad: number expected";
                }
                return null;
            };

            /**
             * Creates a MoveFaceFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.MoveFaceFeature} MoveFaceFeature
             */
            MoveFaceFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.MoveFaceFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.MoveFaceFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.MoveFaceFeature();
                if (object.faces) {
                    if (!Array.isArray(object.faces))
                        throw TypeError(".cadompart.v0_2.MoveFaceFeature.faces: array expected");
                    message.faces = [];
                    for (let i = 0; i < object.faces.length; ++i) {
                        if (!$util.isObject(object.faces[i]))
                            throw TypeError(".cadompart.v0_2.MoveFaceFeature.faces: object expected");
                        message.faces[i] = $root.cadompart.v0_2.FaceRef.fromObject(object.faces[i], long + 1);
                    }
                }
                if (object.translation != null) {
                    if (!$util.isObject(object.translation))
                        throw TypeError(".cadompart.v0_2.MoveFaceFeature.translation: object expected");
                    message.translation = $root.cadompart.v0_2.Vec3.fromObject(object.translation, long + 1);
                }
                if (object.rotationAxisOrigin != null) {
                    if (!$util.isObject(object.rotationAxisOrigin))
                        throw TypeError(".cadompart.v0_2.MoveFaceFeature.rotationAxisOrigin: object expected");
                    message.rotationAxisOrigin = $root.cadompart.v0_2.Vec3.fromObject(object.rotationAxisOrigin, long + 1);
                }
                if (object.rotationAxisDirection != null) {
                    if (!$util.isObject(object.rotationAxisDirection))
                        throw TypeError(".cadompart.v0_2.MoveFaceFeature.rotationAxisDirection: object expected");
                    message.rotationAxisDirection = $root.cadompart.v0_2.Vec3.fromObject(object.rotationAxisDirection, long + 1);
                }
                if (object.rotationAngleRad != null)
                    message.rotationAngleRad = Number(object.rotationAngleRad);
                return message;
            };

            /**
             * Creates a plain object from a MoveFaceFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {cadompart.v0_2.MoveFaceFeature} message MoveFaceFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MoveFaceFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.faces = [];
                if (options.defaults)
                    object.translation = null;
                if (message.faces && message.faces.length) {
                    object.faces = [];
                    for (let j = 0; j < message.faces.length; ++j)
                        object.faces[j] = $root.cadompart.v0_2.FaceRef.toObject(message.faces[j], options, q + 1);
                }
                if (message.translation != null && Object.hasOwnProperty.call(message, "translation"))
                    object.translation = $root.cadompart.v0_2.Vec3.toObject(message.translation, options, q + 1);
                if (message.rotationAxisOrigin != null && Object.hasOwnProperty.call(message, "rotationAxisOrigin")) {
                    object.rotationAxisOrigin = $root.cadompart.v0_2.Vec3.toObject(message.rotationAxisOrigin, options, q + 1);
                    if (options.oneofs)
                        object._rotationAxisOrigin = "rotationAxisOrigin";
                }
                if (message.rotationAxisDirection != null && Object.hasOwnProperty.call(message, "rotationAxisDirection")) {
                    object.rotationAxisDirection = $root.cadompart.v0_2.Vec3.toObject(message.rotationAxisDirection, options, q + 1);
                    if (options.oneofs)
                        object._rotationAxisDirection = "rotationAxisDirection";
                }
                if (message.rotationAngleRad != null && Object.hasOwnProperty.call(message, "rotationAngleRad")) {
                    object.rotationAngleRad = options.json && !isFinite(message.rotationAngleRad) ? String(message.rotationAngleRad) : message.rotationAngleRad;
                    if (options.oneofs)
                        object._rotationAngleRad = "rotationAngleRad";
                }
                return object;
            };

            /**
             * Converts this MoveFaceFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MoveFaceFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MoveFaceFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.MoveFaceFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MoveFaceFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.MoveFaceFeature";
            };

            return MoveFaceFeature;
        })();

        v0_2.SplitFeature = (function() {

            /**
             * Properties of a SplitFeature.
             * @memberof cadompart.v0_2
             * @interface ISplitFeature
             * @property {string|null} [splittingSketchId] SplitFeature splittingSketchId
             * @property {string|null} [splittingFaceId] SplitFeature splittingFaceId
             * @property {boolean|null} [consumeCutters] SplitFeature consumeCutters
             */

            /**
             * Constructs a new SplitFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a SplitFeature.
             * @implements ISplitFeature
             * @constructor
             * @param {cadompart.v0_2.ISplitFeature=} [properties] Properties to set
             */
            function SplitFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SplitFeature splittingSketchId.
             * @member {string} splittingSketchId
             * @memberof cadompart.v0_2.SplitFeature
             * @instance
             */
            SplitFeature.prototype.splittingSketchId = "";

            /**
             * SplitFeature splittingFaceId.
             * @member {string} splittingFaceId
             * @memberof cadompart.v0_2.SplitFeature
             * @instance
             */
            SplitFeature.prototype.splittingFaceId = "";

            /**
             * SplitFeature consumeCutters.
             * @member {boolean} consumeCutters
             * @memberof cadompart.v0_2.SplitFeature
             * @instance
             */
            SplitFeature.prototype.consumeCutters = false;

            /**
             * Creates a new SplitFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {cadompart.v0_2.ISplitFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.SplitFeature} SplitFeature instance
             */
            SplitFeature.create = function create(properties) {
                return new SplitFeature(properties);
            };

            /**
             * Encodes the specified SplitFeature message. Does not implicitly {@link cadompart.v0_2.SplitFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {cadompart.v0_2.ISplitFeature} message SplitFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SplitFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.splittingSketchId != null && Object.hasOwnProperty.call(message, "splittingSketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.splittingSketchId);
                if (message.splittingFaceId != null && Object.hasOwnProperty.call(message, "splittingFaceId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.splittingFaceId);
                if (message.consumeCutters != null && Object.hasOwnProperty.call(message, "consumeCutters"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.consumeCutters);
                return writer;
            };

            /**
             * Encodes the specified SplitFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.SplitFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {cadompart.v0_2.ISplitFeature} message SplitFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SplitFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SplitFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.SplitFeature} SplitFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SplitFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.SplitFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.splittingSketchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.splittingFaceId = reader.string();
                            break;
                        }
                    case 3: {
                            message.consumeCutters = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a SplitFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.SplitFeature} SplitFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SplitFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SplitFeature message.
             * @function verify
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SplitFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.splittingSketchId != null && Object.hasOwnProperty.call(message, "splittingSketchId"))
                    if (!$util.isString(message.splittingSketchId))
                        return "splittingSketchId: string expected";
                if (message.splittingFaceId != null && Object.hasOwnProperty.call(message, "splittingFaceId"))
                    if (!$util.isString(message.splittingFaceId))
                        return "splittingFaceId: string expected";
                if (message.consumeCutters != null && Object.hasOwnProperty.call(message, "consumeCutters"))
                    if (typeof message.consumeCutters !== "boolean")
                        return "consumeCutters: boolean expected";
                return null;
            };

            /**
             * Creates a SplitFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.SplitFeature} SplitFeature
             */
            SplitFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.SplitFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.SplitFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.SplitFeature();
                if (object.splittingSketchId != null)
                    message.splittingSketchId = String(object.splittingSketchId);
                if (object.splittingFaceId != null)
                    message.splittingFaceId = String(object.splittingFaceId);
                if (object.consumeCutters != null)
                    message.consumeCutters = Boolean(object.consumeCutters);
                return message;
            };

            /**
             * Creates a plain object from a SplitFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {cadompart.v0_2.SplitFeature} message SplitFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SplitFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.splittingSketchId = "";
                    object.splittingFaceId = "";
                    object.consumeCutters = false;
                }
                if (message.splittingSketchId != null && Object.hasOwnProperty.call(message, "splittingSketchId"))
                    object.splittingSketchId = message.splittingSketchId;
                if (message.splittingFaceId != null && Object.hasOwnProperty.call(message, "splittingFaceId"))
                    object.splittingFaceId = message.splittingFaceId;
                if (message.consumeCutters != null && Object.hasOwnProperty.call(message, "consumeCutters"))
                    object.consumeCutters = message.consumeCutters;
                return object;
            };

            /**
             * Converts this SplitFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.SplitFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SplitFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SplitFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.SplitFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SplitFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.SplitFeature";
            };

            return SplitFeature;
        })();

        v0_2.ThreadFeature = (function() {

            /**
             * Properties of a ThreadFeature.
             * @memberof cadompart.v0_2
             * @interface IThreadFeature
             * @property {cadompart.v0_2.IEdgeRef|null} [edge] ThreadFeature edge
             * @property {cadompart.v0_2.IFaceRef|null} [cylindricalFace] ThreadFeature cylindricalFace
             * @property {string|null} [designation] ThreadFeature designation
             * @property {number|null} [length] ThreadFeature length
             * @property {boolean|null} [rightHanded] ThreadFeature rightHanded
             * @property {boolean|null} [cosmetic] ThreadFeature cosmetic
             */

            /**
             * Constructs a new ThreadFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a ThreadFeature.
             * @implements IThreadFeature
             * @constructor
             * @param {cadompart.v0_2.IThreadFeature=} [properties] Properties to set
             */
            function ThreadFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ThreadFeature edge.
             * @member {cadompart.v0_2.IEdgeRef|null|undefined} edge
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             */
            ThreadFeature.prototype.edge = null;

            /**
             * ThreadFeature cylindricalFace.
             * @member {cadompart.v0_2.IFaceRef|null|undefined} cylindricalFace
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             */
            ThreadFeature.prototype.cylindricalFace = null;

            /**
             * ThreadFeature designation.
             * @member {string} designation
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             */
            ThreadFeature.prototype.designation = "";

            /**
             * ThreadFeature length.
             * @member {number} length
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             */
            ThreadFeature.prototype.length = 0;

            /**
             * ThreadFeature rightHanded.
             * @member {boolean} rightHanded
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             */
            ThreadFeature.prototype.rightHanded = false;

            /**
             * ThreadFeature cosmetic.
             * @member {boolean} cosmetic
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             */
            ThreadFeature.prototype.cosmetic = false;

            /**
             * Creates a new ThreadFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {cadompart.v0_2.IThreadFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.ThreadFeature} ThreadFeature instance
             */
            ThreadFeature.create = function create(properties) {
                return new ThreadFeature(properties);
            };

            /**
             * Encodes the specified ThreadFeature message. Does not implicitly {@link cadompart.v0_2.ThreadFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {cadompart.v0_2.IThreadFeature} message ThreadFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThreadFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.edge != null && Object.hasOwnProperty.call(message, "edge"))
                    $root.cadompart.v0_2.EdgeRef.encode(message.edge, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.cylindricalFace != null && Object.hasOwnProperty.call(message, "cylindricalFace"))
                    $root.cadompart.v0_2.FaceRef.encode(message.cylindricalFace, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.designation != null && Object.hasOwnProperty.call(message, "designation"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.designation);
                if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.length);
                if (message.rightHanded != null && Object.hasOwnProperty.call(message, "rightHanded"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rightHanded);
                if (message.cosmetic != null && Object.hasOwnProperty.call(message, "cosmetic"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.cosmetic);
                return writer;
            };

            /**
             * Encodes the specified ThreadFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ThreadFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {cadompart.v0_2.IThreadFeature} message ThreadFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ThreadFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ThreadFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ThreadFeature} ThreadFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThreadFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ThreadFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.edge = $root.cadompart.v0_2.EdgeRef.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 2: {
                            message.cylindricalFace = $root.cadompart.v0_2.FaceRef.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.designation = reader.string();
                            break;
                        }
                    case 4: {
                            message.length = reader.double();
                            break;
                        }
                    case 5: {
                            message.rightHanded = reader.bool();
                            break;
                        }
                    case 6: {
                            message.cosmetic = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a ThreadFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ThreadFeature} ThreadFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ThreadFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ThreadFeature message.
             * @function verify
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ThreadFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.edge != null && Object.hasOwnProperty.call(message, "edge")) {
                    let error = $root.cadompart.v0_2.EdgeRef.verify(message.edge, long + 1);
                    if (error)
                        return "edge." + error;
                }
                if (message.cylindricalFace != null && Object.hasOwnProperty.call(message, "cylindricalFace")) {
                    let error = $root.cadompart.v0_2.FaceRef.verify(message.cylindricalFace, long + 1);
                    if (error)
                        return "cylindricalFace." + error;
                }
                if (message.designation != null && Object.hasOwnProperty.call(message, "designation"))
                    if (!$util.isString(message.designation))
                        return "designation: string expected";
                if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                    if (typeof message.length !== "number")
                        return "length: number expected";
                if (message.rightHanded != null && Object.hasOwnProperty.call(message, "rightHanded"))
                    if (typeof message.rightHanded !== "boolean")
                        return "rightHanded: boolean expected";
                if (message.cosmetic != null && Object.hasOwnProperty.call(message, "cosmetic"))
                    if (typeof message.cosmetic !== "boolean")
                        return "cosmetic: boolean expected";
                return null;
            };

            /**
             * Creates a ThreadFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ThreadFeature} ThreadFeature
             */
            ThreadFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ThreadFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ThreadFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ThreadFeature();
                if (object.edge != null) {
                    if (!$util.isObject(object.edge))
                        throw TypeError(".cadompart.v0_2.ThreadFeature.edge: object expected");
                    message.edge = $root.cadompart.v0_2.EdgeRef.fromObject(object.edge, long + 1);
                }
                if (object.cylindricalFace != null) {
                    if (!$util.isObject(object.cylindricalFace))
                        throw TypeError(".cadompart.v0_2.ThreadFeature.cylindricalFace: object expected");
                    message.cylindricalFace = $root.cadompart.v0_2.FaceRef.fromObject(object.cylindricalFace, long + 1);
                }
                if (object.designation != null)
                    message.designation = String(object.designation);
                if (object.length != null)
                    message.length = Number(object.length);
                if (object.rightHanded != null)
                    message.rightHanded = Boolean(object.rightHanded);
                if (object.cosmetic != null)
                    message.cosmetic = Boolean(object.cosmetic);
                return message;
            };

            /**
             * Creates a plain object from a ThreadFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {cadompart.v0_2.ThreadFeature} message ThreadFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ThreadFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.edge = null;
                    object.cylindricalFace = null;
                    object.designation = "";
                    object.length = 0;
                    object.rightHanded = false;
                    object.cosmetic = false;
                }
                if (message.edge != null && Object.hasOwnProperty.call(message, "edge"))
                    object.edge = $root.cadompart.v0_2.EdgeRef.toObject(message.edge, options, q + 1);
                if (message.cylindricalFace != null && Object.hasOwnProperty.call(message, "cylindricalFace"))
                    object.cylindricalFace = $root.cadompart.v0_2.FaceRef.toObject(message.cylindricalFace, options, q + 1);
                if (message.designation != null && Object.hasOwnProperty.call(message, "designation"))
                    object.designation = message.designation;
                if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                    object.length = options.json && !isFinite(message.length) ? String(message.length) : message.length;
                if (message.rightHanded != null && Object.hasOwnProperty.call(message, "rightHanded"))
                    object.rightHanded = message.rightHanded;
                if (message.cosmetic != null && Object.hasOwnProperty.call(message, "cosmetic"))
                    object.cosmetic = message.cosmetic;
                return object;
            };

            /**
             * Converts this ThreadFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ThreadFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ThreadFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ThreadFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ThreadFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ThreadFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ThreadFeature";
            };

            return ThreadFeature;
        })();

        v0_2.HelixFeature = (function() {

            /**
             * Properties of a HelixFeature.
             * @memberof cadompart.v0_2
             * @interface IHelixFeature
             * @property {string|null} [profileSketchId] HelixFeature profileSketchId
             * @property {cadompart.v0_2.IVec3|null} [axisOrigin] HelixFeature axisOrigin
             * @property {cadompart.v0_2.IVec3|null} [axisDirection] HelixFeature axisDirection
             * @property {number|null} [pitch] HelixFeature pitch
             * @property {number|null} [height] HelixFeature height
             * @property {number|null} [revolutions] HelixFeature revolutions
             * @property {boolean|null} [taper] HelixFeature taper
             * @property {number|null} [taperAngleRad] HelixFeature taperAngleRad
             * @property {boolean|null} [cut] HelixFeature cut
             */

            /**
             * Constructs a new HelixFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a HelixFeature.
             * @implements IHelixFeature
             * @constructor
             * @param {cadompart.v0_2.IHelixFeature=} [properties] Properties to set
             */
            function HelixFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HelixFeature profileSketchId.
             * @member {string} profileSketchId
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.profileSketchId = "";

            /**
             * HelixFeature axisOrigin.
             * @member {cadompart.v0_2.IVec3|null|undefined} axisOrigin
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.axisOrigin = null;

            /**
             * HelixFeature axisDirection.
             * @member {cadompart.v0_2.IVec3|null|undefined} axisDirection
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.axisDirection = null;

            /**
             * HelixFeature pitch.
             * @member {number} pitch
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.pitch = 0;

            /**
             * HelixFeature height.
             * @member {number} height
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.height = 0;

            /**
             * HelixFeature revolutions.
             * @member {number} revolutions
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.revolutions = 0;

            /**
             * HelixFeature taper.
             * @member {boolean} taper
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.taper = false;

            /**
             * HelixFeature taperAngleRad.
             * @member {number} taperAngleRad
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.taperAngleRad = 0;

            /**
             * HelixFeature cut.
             * @member {boolean} cut
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             */
            HelixFeature.prototype.cut = false;

            /**
             * Creates a new HelixFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {cadompart.v0_2.IHelixFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.HelixFeature} HelixFeature instance
             */
            HelixFeature.create = function create(properties) {
                return new HelixFeature(properties);
            };

            /**
             * Encodes the specified HelixFeature message. Does not implicitly {@link cadompart.v0_2.HelixFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {cadompart.v0_2.IHelixFeature} message HelixFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HelixFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.profileSketchId);
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin"))
                    $root.cadompart.v0_2.Vec3.encode(message.axisOrigin, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection"))
                    $root.cadompart.v0_2.Vec3.encode(message.axisDirection, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.pitch != null && Object.hasOwnProperty.call(message, "pitch"))
                    writer.uint32(/* id 4, wireType 1 =*/33).double(message.pitch);
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    writer.uint32(/* id 5, wireType 1 =*/41).double(message.height);
                if (message.revolutions != null && Object.hasOwnProperty.call(message, "revolutions"))
                    writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.revolutions);
                if (message.taper != null && Object.hasOwnProperty.call(message, "taper"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.taper);
                if (message.taperAngleRad != null && Object.hasOwnProperty.call(message, "taperAngleRad"))
                    writer.uint32(/* id 8, wireType 1 =*/65).double(message.taperAngleRad);
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.cut);
                return writer;
            };

            /**
             * Encodes the specified HelixFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.HelixFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {cadompart.v0_2.IHelixFeature} message HelixFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HelixFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a HelixFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.HelixFeature} HelixFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HelixFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.HelixFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.profileSketchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.axisOrigin = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.axisDirection = $root.cadompart.v0_2.Vec3.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 4: {
                            message.pitch = reader.double();
                            break;
                        }
                    case 5: {
                            message.height = reader.double();
                            break;
                        }
                    case 6: {
                            message.revolutions = reader.uint32();
                            break;
                        }
                    case 7: {
                            message.taper = reader.bool();
                            break;
                        }
                    case 8: {
                            message.taperAngleRad = reader.double();
                            break;
                        }
                    case 9: {
                            message.cut = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a HelixFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.HelixFeature} HelixFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HelixFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HelixFeature message.
             * @function verify
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HelixFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    if (!$util.isString(message.profileSketchId))
                        return "profileSketchId: string expected";
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axisOrigin, long + 1);
                    if (error)
                        return "axisOrigin." + error;
                }
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection")) {
                    let error = $root.cadompart.v0_2.Vec3.verify(message.axisDirection, long + 1);
                    if (error)
                        return "axisDirection." + error;
                }
                if (message.pitch != null && Object.hasOwnProperty.call(message, "pitch"))
                    if (typeof message.pitch !== "number")
                        return "pitch: number expected";
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    if (typeof message.height !== "number")
                        return "height: number expected";
                if (message.revolutions != null && Object.hasOwnProperty.call(message, "revolutions"))
                    if (!$util.isInteger(message.revolutions))
                        return "revolutions: integer expected";
                if (message.taper != null && Object.hasOwnProperty.call(message, "taper"))
                    if (typeof message.taper !== "boolean")
                        return "taper: boolean expected";
                if (message.taperAngleRad != null && Object.hasOwnProperty.call(message, "taperAngleRad"))
                    if (typeof message.taperAngleRad !== "number")
                        return "taperAngleRad: number expected";
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    if (typeof message.cut !== "boolean")
                        return "cut: boolean expected";
                return null;
            };

            /**
             * Creates a HelixFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.HelixFeature} HelixFeature
             */
            HelixFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.HelixFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.HelixFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.HelixFeature();
                if (object.profileSketchId != null)
                    message.profileSketchId = String(object.profileSketchId);
                if (object.axisOrigin != null) {
                    if (!$util.isObject(object.axisOrigin))
                        throw TypeError(".cadompart.v0_2.HelixFeature.axisOrigin: object expected");
                    message.axisOrigin = $root.cadompart.v0_2.Vec3.fromObject(object.axisOrigin, long + 1);
                }
                if (object.axisDirection != null) {
                    if (!$util.isObject(object.axisDirection))
                        throw TypeError(".cadompart.v0_2.HelixFeature.axisDirection: object expected");
                    message.axisDirection = $root.cadompart.v0_2.Vec3.fromObject(object.axisDirection, long + 1);
                }
                if (object.pitch != null)
                    message.pitch = Number(object.pitch);
                if (object.height != null)
                    message.height = Number(object.height);
                if (object.revolutions != null)
                    message.revolutions = object.revolutions >>> 0;
                if (object.taper != null)
                    message.taper = Boolean(object.taper);
                if (object.taperAngleRad != null)
                    message.taperAngleRad = Number(object.taperAngleRad);
                if (object.cut != null)
                    message.cut = Boolean(object.cut);
                return message;
            };

            /**
             * Creates a plain object from a HelixFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {cadompart.v0_2.HelixFeature} message HelixFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HelixFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.profileSketchId = "";
                    object.axisOrigin = null;
                    object.axisDirection = null;
                    object.pitch = 0;
                    object.height = 0;
                    object.revolutions = 0;
                    object.taper = false;
                    object.taperAngleRad = 0;
                    object.cut = false;
                }
                if (message.profileSketchId != null && Object.hasOwnProperty.call(message, "profileSketchId"))
                    object.profileSketchId = message.profileSketchId;
                if (message.axisOrigin != null && Object.hasOwnProperty.call(message, "axisOrigin"))
                    object.axisOrigin = $root.cadompart.v0_2.Vec3.toObject(message.axisOrigin, options, q + 1);
                if (message.axisDirection != null && Object.hasOwnProperty.call(message, "axisDirection"))
                    object.axisDirection = $root.cadompart.v0_2.Vec3.toObject(message.axisDirection, options, q + 1);
                if (message.pitch != null && Object.hasOwnProperty.call(message, "pitch"))
                    object.pitch = options.json && !isFinite(message.pitch) ? String(message.pitch) : message.pitch;
                if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                    object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
                if (message.revolutions != null && Object.hasOwnProperty.call(message, "revolutions"))
                    object.revolutions = message.revolutions;
                if (message.taper != null && Object.hasOwnProperty.call(message, "taper"))
                    object.taper = message.taper;
                if (message.taperAngleRad != null && Object.hasOwnProperty.call(message, "taperAngleRad"))
                    object.taperAngleRad = options.json && !isFinite(message.taperAngleRad) ? String(message.taperAngleRad) : message.taperAngleRad;
                if (message.cut != null && Object.hasOwnProperty.call(message, "cut"))
                    object.cut = message.cut;
                return object;
            };

            /**
             * Converts this HelixFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.HelixFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HelixFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for HelixFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.HelixFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            HelixFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.HelixFeature";
            };

            return HelixFeature;
        })();

        v0_2.TransformBodyFeature = (function() {

            /**
             * Properties of a TransformBodyFeature.
             * @memberof cadompart.v0_2
             * @interface ITransformBodyFeature
             * @property {string|null} [bodyId] TransformBodyFeature bodyId
             * @property {cadompart.v0_2.IMat4|null} [transform] TransformBodyFeature transform
             * @property {boolean|null} [copy] TransformBodyFeature copy
             */

            /**
             * Constructs a new TransformBodyFeature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a TransformBodyFeature.
             * @implements ITransformBodyFeature
             * @constructor
             * @param {cadompart.v0_2.ITransformBodyFeature=} [properties] Properties to set
             */
            function TransformBodyFeature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransformBodyFeature bodyId.
             * @member {string} bodyId
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @instance
             */
            TransformBodyFeature.prototype.bodyId = "";

            /**
             * TransformBodyFeature transform.
             * @member {cadompart.v0_2.IMat4|null|undefined} transform
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @instance
             */
            TransformBodyFeature.prototype.transform = null;

            /**
             * TransformBodyFeature copy.
             * @member {boolean} copy
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @instance
             */
            TransformBodyFeature.prototype.copy = false;

            /**
             * Creates a new TransformBodyFeature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {cadompart.v0_2.ITransformBodyFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.TransformBodyFeature} TransformBodyFeature instance
             */
            TransformBodyFeature.create = function create(properties) {
                return new TransformBodyFeature(properties);
            };

            /**
             * Encodes the specified TransformBodyFeature message. Does not implicitly {@link cadompart.v0_2.TransformBodyFeature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {cadompart.v0_2.ITransformBodyFeature} message TransformBodyFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransformBodyFeature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.bodyId != null && Object.hasOwnProperty.call(message, "bodyId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.bodyId);
                if (message.transform != null && Object.hasOwnProperty.call(message, "transform"))
                    $root.cadompart.v0_2.Mat4.encode(message.transform, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.copy != null && Object.hasOwnProperty.call(message, "copy"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.copy);
                return writer;
            };

            /**
             * Encodes the specified TransformBodyFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.TransformBodyFeature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {cadompart.v0_2.ITransformBodyFeature} message TransformBodyFeature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransformBodyFeature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a TransformBodyFeature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.TransformBodyFeature} TransformBodyFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransformBodyFeature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.TransformBodyFeature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.bodyId = reader.string();
                            break;
                        }
                    case 2: {
                            message.transform = $root.cadompart.v0_2.Mat4.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.copy = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a TransformBodyFeature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.TransformBodyFeature} TransformBodyFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransformBodyFeature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransformBodyFeature message.
             * @function verify
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransformBodyFeature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.bodyId != null && Object.hasOwnProperty.call(message, "bodyId"))
                    if (!$util.isString(message.bodyId))
                        return "bodyId: string expected";
                if (message.transform != null && Object.hasOwnProperty.call(message, "transform")) {
                    let error = $root.cadompart.v0_2.Mat4.verify(message.transform, long + 1);
                    if (error)
                        return "transform." + error;
                }
                if (message.copy != null && Object.hasOwnProperty.call(message, "copy"))
                    if (typeof message.copy !== "boolean")
                        return "copy: boolean expected";
                return null;
            };

            /**
             * Creates a TransformBodyFeature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.TransformBodyFeature} TransformBodyFeature
             */
            TransformBodyFeature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.TransformBodyFeature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.TransformBodyFeature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.TransformBodyFeature();
                if (object.bodyId != null)
                    message.bodyId = String(object.bodyId);
                if (object.transform != null) {
                    if (!$util.isObject(object.transform))
                        throw TypeError(".cadompart.v0_2.TransformBodyFeature.transform: object expected");
                    message.transform = $root.cadompart.v0_2.Mat4.fromObject(object.transform, long + 1);
                }
                if (object.copy != null)
                    message.copy = Boolean(object.copy);
                return message;
            };

            /**
             * Creates a plain object from a TransformBodyFeature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {cadompart.v0_2.TransformBodyFeature} message TransformBodyFeature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransformBodyFeature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.bodyId = "";
                    object.transform = null;
                    object.copy = false;
                }
                if (message.bodyId != null && Object.hasOwnProperty.call(message, "bodyId"))
                    object.bodyId = message.bodyId;
                if (message.transform != null && Object.hasOwnProperty.call(message, "transform"))
                    object.transform = $root.cadompart.v0_2.Mat4.toObject(message.transform, options, q + 1);
                if (message.copy != null && Object.hasOwnProperty.call(message, "copy"))
                    object.copy = message.copy;
                return object;
            };

            /**
             * Converts this TransformBodyFeature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransformBodyFeature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TransformBodyFeature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.TransformBodyFeature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TransformBodyFeature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.TransformBodyFeature";
            };

            return TransformBodyFeature;
        })();

        v0_2.Feature = (function() {

            /**
             * Properties of a Feature.
             * @memberof cadompart.v0_2
             * @interface IFeature
             * @property {string|null} [id] Feature id
             * @property {string|null} [name] Feature name
             * @property {boolean|null} [suppressed] Feature suppressed
             * @property {Array.<string>|null} [parameterIds] Feature parameterIds
             * @property {Array.<string>|null} [bodyIdsOut] Feature bodyIdsOut
             * @property {cadompart.v0_2.ISketchFeature|null} [sketch] Feature sketch
             * @property {cadompart.v0_2.IExtrudeFeature|null} [extrude] Feature extrude
             * @property {cadompart.v0_2.IRevolveFeature|null} [revolve] Feature revolve
             * @property {cadompart.v0_2.ISweepFeature|null} [sweep] Feature sweep
             * @property {cadompart.v0_2.ILoftFeature|null} [loft] Feature loft
             * @property {cadompart.v0_2.IHoleFeature|null} [hole] Feature hole
             * @property {cadompart.v0_2.IFilletFeature|null} [fillet] Feature fillet
             * @property {cadompart.v0_2.IChamferFeature|null} [chamfer] Feature chamfer
             * @property {cadompart.v0_2.IShellFeature|null} [shell] Feature shell
             * @property {cadompart.v0_2.IDraftFeature|null} [draft] Feature draft
             * @property {cadompart.v0_2.IRibFeature|null} [rib] Feature rib
             * @property {cadompart.v0_2.IMirrorFeature|null} [mirror] Feature mirror
             * @property {cadompart.v0_2.IPatternLinearFeature|null} [patternLinear] Feature patternLinear
             * @property {cadompart.v0_2.IPatternCircularFeature|null} [patternCircular] Feature patternCircular
             * @property {cadompart.v0_2.IBooleanFeature|null} [boolean] Feature boolean
             * @property {cadompart.v0_2.IThickenFeature|null} [thicken] Feature thicken
             * @property {cadompart.v0_2.IOffsetFacesFeature|null} [offsetFaces] Feature offsetFaces
             * @property {cadompart.v0_2.IMoveFaceFeature|null} [moveFace] Feature moveFace
             * @property {cadompart.v0_2.ISplitFeature|null} [split] Feature split
             * @property {cadompart.v0_2.IThreadFeature|null} [thread] Feature thread
             * @property {cadompart.v0_2.IHelixFeature|null} [helix] Feature helix
             * @property {cadompart.v0_2.ITransformBodyFeature|null} [transformBody] Feature transformBody
             */

            /**
             * Constructs a new Feature.
             * @memberof cadompart.v0_2
             * @classdesc Represents a Feature.
             * @implements IFeature
             * @constructor
             * @param {cadompart.v0_2.IFeature=} [properties] Properties to set
             */
            function Feature(properties) {
                this.parameterIds = [];
                this.bodyIdsOut = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Feature id.
             * @member {string} id
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.id = "";

            /**
             * Feature name.
             * @member {string} name
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.name = "";

            /**
             * Feature suppressed.
             * @member {boolean} suppressed
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.suppressed = false;

            /**
             * Feature parameterIds.
             * @member {Array.<string>} parameterIds
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.parameterIds = $util.emptyArray;

            /**
             * Feature bodyIdsOut.
             * @member {Array.<string>} bodyIdsOut
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.bodyIdsOut = $util.emptyArray;

            /**
             * Feature sketch.
             * @member {cadompart.v0_2.ISketchFeature|null|undefined} sketch
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.sketch = null;

            /**
             * Feature extrude.
             * @member {cadompart.v0_2.IExtrudeFeature|null|undefined} extrude
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.extrude = null;

            /**
             * Feature revolve.
             * @member {cadompart.v0_2.IRevolveFeature|null|undefined} revolve
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.revolve = null;

            /**
             * Feature sweep.
             * @member {cadompart.v0_2.ISweepFeature|null|undefined} sweep
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.sweep = null;

            /**
             * Feature loft.
             * @member {cadompart.v0_2.ILoftFeature|null|undefined} loft
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.loft = null;

            /**
             * Feature hole.
             * @member {cadompart.v0_2.IHoleFeature|null|undefined} hole
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.hole = null;

            /**
             * Feature fillet.
             * @member {cadompart.v0_2.IFilletFeature|null|undefined} fillet
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.fillet = null;

            /**
             * Feature chamfer.
             * @member {cadompart.v0_2.IChamferFeature|null|undefined} chamfer
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.chamfer = null;

            /**
             * Feature shell.
             * @member {cadompart.v0_2.IShellFeature|null|undefined} shell
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.shell = null;

            /**
             * Feature draft.
             * @member {cadompart.v0_2.IDraftFeature|null|undefined} draft
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.draft = null;

            /**
             * Feature rib.
             * @member {cadompart.v0_2.IRibFeature|null|undefined} rib
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.rib = null;

            /**
             * Feature mirror.
             * @member {cadompart.v0_2.IMirrorFeature|null|undefined} mirror
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.mirror = null;

            /**
             * Feature patternLinear.
             * @member {cadompart.v0_2.IPatternLinearFeature|null|undefined} patternLinear
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.patternLinear = null;

            /**
             * Feature patternCircular.
             * @member {cadompart.v0_2.IPatternCircularFeature|null|undefined} patternCircular
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.patternCircular = null;

            /**
             * Feature boolean.
             * @member {cadompart.v0_2.IBooleanFeature|null|undefined} boolean
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.boolean = null;

            /**
             * Feature thicken.
             * @member {cadompart.v0_2.IThickenFeature|null|undefined} thicken
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.thicken = null;

            /**
             * Feature offsetFaces.
             * @member {cadompart.v0_2.IOffsetFacesFeature|null|undefined} offsetFaces
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.offsetFaces = null;

            /**
             * Feature moveFace.
             * @member {cadompart.v0_2.IMoveFaceFeature|null|undefined} moveFace
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.moveFace = null;

            /**
             * Feature split.
             * @member {cadompart.v0_2.ISplitFeature|null|undefined} split
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.split = null;

            /**
             * Feature thread.
             * @member {cadompart.v0_2.IThreadFeature|null|undefined} thread
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.thread = null;

            /**
             * Feature helix.
             * @member {cadompart.v0_2.IHelixFeature|null|undefined} helix
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.helix = null;

            /**
             * Feature transformBody.
             * @member {cadompart.v0_2.ITransformBodyFeature|null|undefined} transformBody
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Feature.prototype.transformBody = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * Feature body.
             * @member {"sketch"|"extrude"|"revolve"|"sweep"|"loft"|"hole"|"fillet"|"chamfer"|"shell"|"draft"|"rib"|"mirror"|"patternLinear"|"patternCircular"|"boolean"|"thicken"|"offsetFaces"|"moveFace"|"split"|"thread"|"helix"|"transformBody"|undefined} body
             * @memberof cadompart.v0_2.Feature
             * @instance
             */
            Object.defineProperty(Feature.prototype, "body", {
                get: $util.oneOfGetter($oneOfFields = ["sketch", "extrude", "revolve", "sweep", "loft", "hole", "fillet", "chamfer", "shell", "draft", "rib", "mirror", "patternLinear", "patternCircular", "boolean", "thicken", "offsetFaces", "moveFace", "split", "thread", "helix", "transformBody"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Feature instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {cadompart.v0_2.IFeature=} [properties] Properties to set
             * @returns {cadompart.v0_2.Feature} Feature instance
             */
            Feature.create = function create(properties) {
                return new Feature(properties);
            };

            /**
             * Encodes the specified Feature message. Does not implicitly {@link cadompart.v0_2.Feature.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {cadompart.v0_2.IFeature} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.suppressed != null && Object.hasOwnProperty.call(message, "suppressed"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.suppressed);
                if (message.parameterIds != null && message.parameterIds.length)
                    for (let i = 0; i < message.parameterIds.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.parameterIds[i]);
                if (message.bodyIdsOut != null && message.bodyIdsOut.length)
                    for (let i = 0; i < message.bodyIdsOut.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.bodyIdsOut[i]);
                if (message.sketch != null && Object.hasOwnProperty.call(message, "sketch"))
                    $root.cadompart.v0_2.SketchFeature.encode(message.sketch, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
                if (message.extrude != null && Object.hasOwnProperty.call(message, "extrude"))
                    $root.cadompart.v0_2.ExtrudeFeature.encode(message.extrude, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
                if (message.revolve != null && Object.hasOwnProperty.call(message, "revolve"))
                    $root.cadompart.v0_2.RevolveFeature.encode(message.revolve, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
                if (message.sweep != null && Object.hasOwnProperty.call(message, "sweep"))
                    $root.cadompart.v0_2.SweepFeature.encode(message.sweep, writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
                if (message.loft != null && Object.hasOwnProperty.call(message, "loft"))
                    $root.cadompart.v0_2.LoftFeature.encode(message.loft, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
                if (message.hole != null && Object.hasOwnProperty.call(message, "hole"))
                    $root.cadompart.v0_2.HoleFeature.encode(message.hole, writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
                if (message.fillet != null && Object.hasOwnProperty.call(message, "fillet"))
                    $root.cadompart.v0_2.FilletFeature.encode(message.fillet, writer.uint32(/* id 16, wireType 2 =*/130).fork(), q + 1).ldelim();
                if (message.chamfer != null && Object.hasOwnProperty.call(message, "chamfer"))
                    $root.cadompart.v0_2.ChamferFeature.encode(message.chamfer, writer.uint32(/* id 17, wireType 2 =*/138).fork(), q + 1).ldelim();
                if (message.shell != null && Object.hasOwnProperty.call(message, "shell"))
                    $root.cadompart.v0_2.ShellFeature.encode(message.shell, writer.uint32(/* id 18, wireType 2 =*/146).fork(), q + 1).ldelim();
                if (message.draft != null && Object.hasOwnProperty.call(message, "draft"))
                    $root.cadompart.v0_2.DraftFeature.encode(message.draft, writer.uint32(/* id 19, wireType 2 =*/154).fork(), q + 1).ldelim();
                if (message.rib != null && Object.hasOwnProperty.call(message, "rib"))
                    $root.cadompart.v0_2.RibFeature.encode(message.rib, writer.uint32(/* id 20, wireType 2 =*/162).fork(), q + 1).ldelim();
                if (message.mirror != null && Object.hasOwnProperty.call(message, "mirror"))
                    $root.cadompart.v0_2.MirrorFeature.encode(message.mirror, writer.uint32(/* id 21, wireType 2 =*/170).fork(), q + 1).ldelim();
                if (message.patternLinear != null && Object.hasOwnProperty.call(message, "patternLinear"))
                    $root.cadompart.v0_2.PatternLinearFeature.encode(message.patternLinear, writer.uint32(/* id 22, wireType 2 =*/178).fork(), q + 1).ldelim();
                if (message.patternCircular != null && Object.hasOwnProperty.call(message, "patternCircular"))
                    $root.cadompart.v0_2.PatternCircularFeature.encode(message.patternCircular, writer.uint32(/* id 23, wireType 2 =*/186).fork(), q + 1).ldelim();
                if (message.boolean != null && Object.hasOwnProperty.call(message, "boolean"))
                    $root.cadompart.v0_2.BooleanFeature.encode(message.boolean, writer.uint32(/* id 24, wireType 2 =*/194).fork(), q + 1).ldelim();
                if (message.thicken != null && Object.hasOwnProperty.call(message, "thicken"))
                    $root.cadompart.v0_2.ThickenFeature.encode(message.thicken, writer.uint32(/* id 25, wireType 2 =*/202).fork(), q + 1).ldelim();
                if (message.offsetFaces != null && Object.hasOwnProperty.call(message, "offsetFaces"))
                    $root.cadompart.v0_2.OffsetFacesFeature.encode(message.offsetFaces, writer.uint32(/* id 26, wireType 2 =*/210).fork(), q + 1).ldelim();
                if (message.moveFace != null && Object.hasOwnProperty.call(message, "moveFace"))
                    $root.cadompart.v0_2.MoveFaceFeature.encode(message.moveFace, writer.uint32(/* id 27, wireType 2 =*/218).fork(), q + 1).ldelim();
                if (message.split != null && Object.hasOwnProperty.call(message, "split"))
                    $root.cadompart.v0_2.SplitFeature.encode(message.split, writer.uint32(/* id 28, wireType 2 =*/226).fork(), q + 1).ldelim();
                if (message.thread != null && Object.hasOwnProperty.call(message, "thread"))
                    $root.cadompart.v0_2.ThreadFeature.encode(message.thread, writer.uint32(/* id 29, wireType 2 =*/234).fork(), q + 1).ldelim();
                if (message.helix != null && Object.hasOwnProperty.call(message, "helix"))
                    $root.cadompart.v0_2.HelixFeature.encode(message.helix, writer.uint32(/* id 30, wireType 2 =*/242).fork(), q + 1).ldelim();
                if (message.transformBody != null && Object.hasOwnProperty.call(message, "transformBody"))
                    $root.cadompart.v0_2.TransformBodyFeature.encode(message.transformBody, writer.uint32(/* id 31, wireType 2 =*/250).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Feature message, length delimited. Does not implicitly {@link cadompart.v0_2.Feature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {cadompart.v0_2.IFeature} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Feature message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.Feature} Feature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Feature.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.Feature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.suppressed = reader.bool();
                            break;
                        }
                    case 4: {
                            if (!(message.parameterIds && message.parameterIds.length))
                                message.parameterIds = [];
                            message.parameterIds.push(reader.string());
                            break;
                        }
                    case 5: {
                            if (!(message.bodyIdsOut && message.bodyIdsOut.length))
                                message.bodyIdsOut = [];
                            message.bodyIdsOut.push(reader.string());
                            break;
                        }
                    case 10: {
                            message.sketch = $root.cadompart.v0_2.SketchFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 11: {
                            message.extrude = $root.cadompart.v0_2.ExtrudeFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 12: {
                            message.revolve = $root.cadompart.v0_2.RevolveFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 13: {
                            message.sweep = $root.cadompart.v0_2.SweepFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 14: {
                            message.loft = $root.cadompart.v0_2.LoftFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 15: {
                            message.hole = $root.cadompart.v0_2.HoleFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 16: {
                            message.fillet = $root.cadompart.v0_2.FilletFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 17: {
                            message.chamfer = $root.cadompart.v0_2.ChamferFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 18: {
                            message.shell = $root.cadompart.v0_2.ShellFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 19: {
                            message.draft = $root.cadompart.v0_2.DraftFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 20: {
                            message.rib = $root.cadompart.v0_2.RibFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 21: {
                            message.mirror = $root.cadompart.v0_2.MirrorFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 22: {
                            message.patternLinear = $root.cadompart.v0_2.PatternLinearFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 23: {
                            message.patternCircular = $root.cadompart.v0_2.PatternCircularFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 24: {
                            message.boolean = $root.cadompart.v0_2.BooleanFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 25: {
                            message.thicken = $root.cadompart.v0_2.ThickenFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 26: {
                            message.offsetFaces = $root.cadompart.v0_2.OffsetFacesFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 27: {
                            message.moveFace = $root.cadompart.v0_2.MoveFaceFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 28: {
                            message.split = $root.cadompart.v0_2.SplitFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 29: {
                            message.thread = $root.cadompart.v0_2.ThreadFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 30: {
                            message.helix = $root.cadompart.v0_2.HelixFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 31: {
                            message.transformBody = $root.cadompart.v0_2.TransformBodyFeature.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a Feature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.Feature} Feature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Feature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Feature message.
             * @function verify
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Feature.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.suppressed != null && Object.hasOwnProperty.call(message, "suppressed"))
                    if (typeof message.suppressed !== "boolean")
                        return "suppressed: boolean expected";
                if (message.parameterIds != null && Object.hasOwnProperty.call(message, "parameterIds")) {
                    if (!Array.isArray(message.parameterIds))
                        return "parameterIds: array expected";
                    for (let i = 0; i < message.parameterIds.length; ++i)
                        if (!$util.isString(message.parameterIds[i]))
                            return "parameterIds: string[] expected";
                }
                if (message.bodyIdsOut != null && Object.hasOwnProperty.call(message, "bodyIdsOut")) {
                    if (!Array.isArray(message.bodyIdsOut))
                        return "bodyIdsOut: array expected";
                    for (let i = 0; i < message.bodyIdsOut.length; ++i)
                        if (!$util.isString(message.bodyIdsOut[i]))
                            return "bodyIdsOut: string[] expected";
                }
                if (message.sketch != null && Object.hasOwnProperty.call(message, "sketch")) {
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.SketchFeature.verify(message.sketch, long + 1);
                        if (error)
                            return "sketch." + error;
                    }
                }
                if (message.extrude != null && Object.hasOwnProperty.call(message, "extrude")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.ExtrudeFeature.verify(message.extrude, long + 1);
                        if (error)
                            return "extrude." + error;
                    }
                }
                if (message.revolve != null && Object.hasOwnProperty.call(message, "revolve")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.RevolveFeature.verify(message.revolve, long + 1);
                        if (error)
                            return "revolve." + error;
                    }
                }
                if (message.sweep != null && Object.hasOwnProperty.call(message, "sweep")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.SweepFeature.verify(message.sweep, long + 1);
                        if (error)
                            return "sweep." + error;
                    }
                }
                if (message.loft != null && Object.hasOwnProperty.call(message, "loft")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.LoftFeature.verify(message.loft, long + 1);
                        if (error)
                            return "loft." + error;
                    }
                }
                if (message.hole != null && Object.hasOwnProperty.call(message, "hole")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.HoleFeature.verify(message.hole, long + 1);
                        if (error)
                            return "hole." + error;
                    }
                }
                if (message.fillet != null && Object.hasOwnProperty.call(message, "fillet")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.FilletFeature.verify(message.fillet, long + 1);
                        if (error)
                            return "fillet." + error;
                    }
                }
                if (message.chamfer != null && Object.hasOwnProperty.call(message, "chamfer")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.ChamferFeature.verify(message.chamfer, long + 1);
                        if (error)
                            return "chamfer." + error;
                    }
                }
                if (message.shell != null && Object.hasOwnProperty.call(message, "shell")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.ShellFeature.verify(message.shell, long + 1);
                        if (error)
                            return "shell." + error;
                    }
                }
                if (message.draft != null && Object.hasOwnProperty.call(message, "draft")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.DraftFeature.verify(message.draft, long + 1);
                        if (error)
                            return "draft." + error;
                    }
                }
                if (message.rib != null && Object.hasOwnProperty.call(message, "rib")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.RibFeature.verify(message.rib, long + 1);
                        if (error)
                            return "rib." + error;
                    }
                }
                if (message.mirror != null && Object.hasOwnProperty.call(message, "mirror")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.MirrorFeature.verify(message.mirror, long + 1);
                        if (error)
                            return "mirror." + error;
                    }
                }
                if (message.patternLinear != null && Object.hasOwnProperty.call(message, "patternLinear")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.PatternLinearFeature.verify(message.patternLinear, long + 1);
                        if (error)
                            return "patternLinear." + error;
                    }
                }
                if (message.patternCircular != null && Object.hasOwnProperty.call(message, "patternCircular")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.PatternCircularFeature.verify(message.patternCircular, long + 1);
                        if (error)
                            return "patternCircular." + error;
                    }
                }
                if (message.boolean != null && Object.hasOwnProperty.call(message, "boolean")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.BooleanFeature.verify(message.boolean, long + 1);
                        if (error)
                            return "boolean." + error;
                    }
                }
                if (message.thicken != null && Object.hasOwnProperty.call(message, "thicken")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.ThickenFeature.verify(message.thicken, long + 1);
                        if (error)
                            return "thicken." + error;
                    }
                }
                if (message.offsetFaces != null && Object.hasOwnProperty.call(message, "offsetFaces")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.OffsetFacesFeature.verify(message.offsetFaces, long + 1);
                        if (error)
                            return "offsetFaces." + error;
                    }
                }
                if (message.moveFace != null && Object.hasOwnProperty.call(message, "moveFace")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.MoveFaceFeature.verify(message.moveFace, long + 1);
                        if (error)
                            return "moveFace." + error;
                    }
                }
                if (message.split != null && Object.hasOwnProperty.call(message, "split")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.SplitFeature.verify(message.split, long + 1);
                        if (error)
                            return "split." + error;
                    }
                }
                if (message.thread != null && Object.hasOwnProperty.call(message, "thread")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.ThreadFeature.verify(message.thread, long + 1);
                        if (error)
                            return "thread." + error;
                    }
                }
                if (message.helix != null && Object.hasOwnProperty.call(message, "helix")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.HelixFeature.verify(message.helix, long + 1);
                        if (error)
                            return "helix." + error;
                    }
                }
                if (message.transformBody != null && Object.hasOwnProperty.call(message, "transformBody")) {
                    if (properties.body === 1)
                        return "body: multiple values";
                    properties.body = 1;
                    {
                        let error = $root.cadompart.v0_2.TransformBodyFeature.verify(message.transformBody, long + 1);
                        if (error)
                            return "transformBody." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Feature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.Feature} Feature
             */
            Feature.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.Feature)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.Feature: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.Feature();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.suppressed != null)
                    message.suppressed = Boolean(object.suppressed);
                if (object.parameterIds) {
                    if (!Array.isArray(object.parameterIds))
                        throw TypeError(".cadompart.v0_2.Feature.parameterIds: array expected");
                    message.parameterIds = [];
                    for (let i = 0; i < object.parameterIds.length; ++i)
                        message.parameterIds[i] = String(object.parameterIds[i]);
                }
                if (object.bodyIdsOut) {
                    if (!Array.isArray(object.bodyIdsOut))
                        throw TypeError(".cadompart.v0_2.Feature.bodyIdsOut: array expected");
                    message.bodyIdsOut = [];
                    for (let i = 0; i < object.bodyIdsOut.length; ++i)
                        message.bodyIdsOut[i] = String(object.bodyIdsOut[i]);
                }
                if (object.sketch != null) {
                    if (!$util.isObject(object.sketch))
                        throw TypeError(".cadompart.v0_2.Feature.sketch: object expected");
                    message.sketch = $root.cadompart.v0_2.SketchFeature.fromObject(object.sketch, long + 1);
                }
                if (object.extrude != null) {
                    if (!$util.isObject(object.extrude))
                        throw TypeError(".cadompart.v0_2.Feature.extrude: object expected");
                    message.extrude = $root.cadompart.v0_2.ExtrudeFeature.fromObject(object.extrude, long + 1);
                }
                if (object.revolve != null) {
                    if (!$util.isObject(object.revolve))
                        throw TypeError(".cadompart.v0_2.Feature.revolve: object expected");
                    message.revolve = $root.cadompart.v0_2.RevolveFeature.fromObject(object.revolve, long + 1);
                }
                if (object.sweep != null) {
                    if (!$util.isObject(object.sweep))
                        throw TypeError(".cadompart.v0_2.Feature.sweep: object expected");
                    message.sweep = $root.cadompart.v0_2.SweepFeature.fromObject(object.sweep, long + 1);
                }
                if (object.loft != null) {
                    if (!$util.isObject(object.loft))
                        throw TypeError(".cadompart.v0_2.Feature.loft: object expected");
                    message.loft = $root.cadompart.v0_2.LoftFeature.fromObject(object.loft, long + 1);
                }
                if (object.hole != null) {
                    if (!$util.isObject(object.hole))
                        throw TypeError(".cadompart.v0_2.Feature.hole: object expected");
                    message.hole = $root.cadompart.v0_2.HoleFeature.fromObject(object.hole, long + 1);
                }
                if (object.fillet != null) {
                    if (!$util.isObject(object.fillet))
                        throw TypeError(".cadompart.v0_2.Feature.fillet: object expected");
                    message.fillet = $root.cadompart.v0_2.FilletFeature.fromObject(object.fillet, long + 1);
                }
                if (object.chamfer != null) {
                    if (!$util.isObject(object.chamfer))
                        throw TypeError(".cadompart.v0_2.Feature.chamfer: object expected");
                    message.chamfer = $root.cadompart.v0_2.ChamferFeature.fromObject(object.chamfer, long + 1);
                }
                if (object.shell != null) {
                    if (!$util.isObject(object.shell))
                        throw TypeError(".cadompart.v0_2.Feature.shell: object expected");
                    message.shell = $root.cadompart.v0_2.ShellFeature.fromObject(object.shell, long + 1);
                }
                if (object.draft != null) {
                    if (!$util.isObject(object.draft))
                        throw TypeError(".cadompart.v0_2.Feature.draft: object expected");
                    message.draft = $root.cadompart.v0_2.DraftFeature.fromObject(object.draft, long + 1);
                }
                if (object.rib != null) {
                    if (!$util.isObject(object.rib))
                        throw TypeError(".cadompart.v0_2.Feature.rib: object expected");
                    message.rib = $root.cadompart.v0_2.RibFeature.fromObject(object.rib, long + 1);
                }
                if (object.mirror != null) {
                    if (!$util.isObject(object.mirror))
                        throw TypeError(".cadompart.v0_2.Feature.mirror: object expected");
                    message.mirror = $root.cadompart.v0_2.MirrorFeature.fromObject(object.mirror, long + 1);
                }
                if (object.patternLinear != null) {
                    if (!$util.isObject(object.patternLinear))
                        throw TypeError(".cadompart.v0_2.Feature.patternLinear: object expected");
                    message.patternLinear = $root.cadompart.v0_2.PatternLinearFeature.fromObject(object.patternLinear, long + 1);
                }
                if (object.patternCircular != null) {
                    if (!$util.isObject(object.patternCircular))
                        throw TypeError(".cadompart.v0_2.Feature.patternCircular: object expected");
                    message.patternCircular = $root.cadompart.v0_2.PatternCircularFeature.fromObject(object.patternCircular, long + 1);
                }
                if (object.boolean != null) {
                    if (!$util.isObject(object.boolean))
                        throw TypeError(".cadompart.v0_2.Feature.boolean: object expected");
                    message.boolean = $root.cadompart.v0_2.BooleanFeature.fromObject(object.boolean, long + 1);
                }
                if (object.thicken != null) {
                    if (!$util.isObject(object.thicken))
                        throw TypeError(".cadompart.v0_2.Feature.thicken: object expected");
                    message.thicken = $root.cadompart.v0_2.ThickenFeature.fromObject(object.thicken, long + 1);
                }
                if (object.offsetFaces != null) {
                    if (!$util.isObject(object.offsetFaces))
                        throw TypeError(".cadompart.v0_2.Feature.offsetFaces: object expected");
                    message.offsetFaces = $root.cadompart.v0_2.OffsetFacesFeature.fromObject(object.offsetFaces, long + 1);
                }
                if (object.moveFace != null) {
                    if (!$util.isObject(object.moveFace))
                        throw TypeError(".cadompart.v0_2.Feature.moveFace: object expected");
                    message.moveFace = $root.cadompart.v0_2.MoveFaceFeature.fromObject(object.moveFace, long + 1);
                }
                if (object.split != null) {
                    if (!$util.isObject(object.split))
                        throw TypeError(".cadompart.v0_2.Feature.split: object expected");
                    message.split = $root.cadompart.v0_2.SplitFeature.fromObject(object.split, long + 1);
                }
                if (object.thread != null) {
                    if (!$util.isObject(object.thread))
                        throw TypeError(".cadompart.v0_2.Feature.thread: object expected");
                    message.thread = $root.cadompart.v0_2.ThreadFeature.fromObject(object.thread, long + 1);
                }
                if (object.helix != null) {
                    if (!$util.isObject(object.helix))
                        throw TypeError(".cadompart.v0_2.Feature.helix: object expected");
                    message.helix = $root.cadompart.v0_2.HelixFeature.fromObject(object.helix, long + 1);
                }
                if (object.transformBody != null) {
                    if (!$util.isObject(object.transformBody))
                        throw TypeError(".cadompart.v0_2.Feature.transformBody: object expected");
                    message.transformBody = $root.cadompart.v0_2.TransformBodyFeature.fromObject(object.transformBody, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a Feature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {cadompart.v0_2.Feature} message Feature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Feature.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.parameterIds = [];
                    object.bodyIdsOut = [];
                }
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.suppressed = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.suppressed != null && Object.hasOwnProperty.call(message, "suppressed"))
                    object.suppressed = message.suppressed;
                if (message.parameterIds && message.parameterIds.length) {
                    object.parameterIds = [];
                    for (let j = 0; j < message.parameterIds.length; ++j)
                        object.parameterIds[j] = message.parameterIds[j];
                }
                if (message.bodyIdsOut && message.bodyIdsOut.length) {
                    object.bodyIdsOut = [];
                    for (let j = 0; j < message.bodyIdsOut.length; ++j)
                        object.bodyIdsOut[j] = message.bodyIdsOut[j];
                }
                if (message.sketch != null && Object.hasOwnProperty.call(message, "sketch")) {
                    object.sketch = $root.cadompart.v0_2.SketchFeature.toObject(message.sketch, options, q + 1);
                    if (options.oneofs)
                        object.body = "sketch";
                }
                if (message.extrude != null && Object.hasOwnProperty.call(message, "extrude")) {
                    object.extrude = $root.cadompart.v0_2.ExtrudeFeature.toObject(message.extrude, options, q + 1);
                    if (options.oneofs)
                        object.body = "extrude";
                }
                if (message.revolve != null && Object.hasOwnProperty.call(message, "revolve")) {
                    object.revolve = $root.cadompart.v0_2.RevolveFeature.toObject(message.revolve, options, q + 1);
                    if (options.oneofs)
                        object.body = "revolve";
                }
                if (message.sweep != null && Object.hasOwnProperty.call(message, "sweep")) {
                    object.sweep = $root.cadompart.v0_2.SweepFeature.toObject(message.sweep, options, q + 1);
                    if (options.oneofs)
                        object.body = "sweep";
                }
                if (message.loft != null && Object.hasOwnProperty.call(message, "loft")) {
                    object.loft = $root.cadompart.v0_2.LoftFeature.toObject(message.loft, options, q + 1);
                    if (options.oneofs)
                        object.body = "loft";
                }
                if (message.hole != null && Object.hasOwnProperty.call(message, "hole")) {
                    object.hole = $root.cadompart.v0_2.HoleFeature.toObject(message.hole, options, q + 1);
                    if (options.oneofs)
                        object.body = "hole";
                }
                if (message.fillet != null && Object.hasOwnProperty.call(message, "fillet")) {
                    object.fillet = $root.cadompart.v0_2.FilletFeature.toObject(message.fillet, options, q + 1);
                    if (options.oneofs)
                        object.body = "fillet";
                }
                if (message.chamfer != null && Object.hasOwnProperty.call(message, "chamfer")) {
                    object.chamfer = $root.cadompart.v0_2.ChamferFeature.toObject(message.chamfer, options, q + 1);
                    if (options.oneofs)
                        object.body = "chamfer";
                }
                if (message.shell != null && Object.hasOwnProperty.call(message, "shell")) {
                    object.shell = $root.cadompart.v0_2.ShellFeature.toObject(message.shell, options, q + 1);
                    if (options.oneofs)
                        object.body = "shell";
                }
                if (message.draft != null && Object.hasOwnProperty.call(message, "draft")) {
                    object.draft = $root.cadompart.v0_2.DraftFeature.toObject(message.draft, options, q + 1);
                    if (options.oneofs)
                        object.body = "draft";
                }
                if (message.rib != null && Object.hasOwnProperty.call(message, "rib")) {
                    object.rib = $root.cadompart.v0_2.RibFeature.toObject(message.rib, options, q + 1);
                    if (options.oneofs)
                        object.body = "rib";
                }
                if (message.mirror != null && Object.hasOwnProperty.call(message, "mirror")) {
                    object.mirror = $root.cadompart.v0_2.MirrorFeature.toObject(message.mirror, options, q + 1);
                    if (options.oneofs)
                        object.body = "mirror";
                }
                if (message.patternLinear != null && Object.hasOwnProperty.call(message, "patternLinear")) {
                    object.patternLinear = $root.cadompart.v0_2.PatternLinearFeature.toObject(message.patternLinear, options, q + 1);
                    if (options.oneofs)
                        object.body = "patternLinear";
                }
                if (message.patternCircular != null && Object.hasOwnProperty.call(message, "patternCircular")) {
                    object.patternCircular = $root.cadompart.v0_2.PatternCircularFeature.toObject(message.patternCircular, options, q + 1);
                    if (options.oneofs)
                        object.body = "patternCircular";
                }
                if (message.boolean != null && Object.hasOwnProperty.call(message, "boolean")) {
                    object.boolean = $root.cadompart.v0_2.BooleanFeature.toObject(message.boolean, options, q + 1);
                    if (options.oneofs)
                        object.body = "boolean";
                }
                if (message.thicken != null && Object.hasOwnProperty.call(message, "thicken")) {
                    object.thicken = $root.cadompart.v0_2.ThickenFeature.toObject(message.thicken, options, q + 1);
                    if (options.oneofs)
                        object.body = "thicken";
                }
                if (message.offsetFaces != null && Object.hasOwnProperty.call(message, "offsetFaces")) {
                    object.offsetFaces = $root.cadompart.v0_2.OffsetFacesFeature.toObject(message.offsetFaces, options, q + 1);
                    if (options.oneofs)
                        object.body = "offsetFaces";
                }
                if (message.moveFace != null && Object.hasOwnProperty.call(message, "moveFace")) {
                    object.moveFace = $root.cadompart.v0_2.MoveFaceFeature.toObject(message.moveFace, options, q + 1);
                    if (options.oneofs)
                        object.body = "moveFace";
                }
                if (message.split != null && Object.hasOwnProperty.call(message, "split")) {
                    object.split = $root.cadompart.v0_2.SplitFeature.toObject(message.split, options, q + 1);
                    if (options.oneofs)
                        object.body = "split";
                }
                if (message.thread != null && Object.hasOwnProperty.call(message, "thread")) {
                    object.thread = $root.cadompart.v0_2.ThreadFeature.toObject(message.thread, options, q + 1);
                    if (options.oneofs)
                        object.body = "thread";
                }
                if (message.helix != null && Object.hasOwnProperty.call(message, "helix")) {
                    object.helix = $root.cadompart.v0_2.HelixFeature.toObject(message.helix, options, q + 1);
                    if (options.oneofs)
                        object.body = "helix";
                }
                if (message.transformBody != null && Object.hasOwnProperty.call(message, "transformBody")) {
                    object.transformBody = $root.cadompart.v0_2.TransformBodyFeature.toObject(message.transformBody, options, q + 1);
                    if (options.oneofs)
                        object.body = "transformBody";
                }
                return object;
            };

            /**
             * Converts this Feature to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.Feature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Feature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Feature
             * @function getTypeUrl
             * @memberof cadompart.v0_2.Feature
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Feature.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.Feature";
            };

            return Feature;
        })();

        v0_2.ConfigurationParameterValue = (function() {

            /**
             * Properties of a ConfigurationParameterValue.
             * @memberof cadompart.v0_2
             * @interface IConfigurationParameterValue
             * @property {string|null} [parameterId] ConfigurationParameterValue parameterId
             * @property {number|null} [floatValue] ConfigurationParameterValue floatValue
             * @property {number|Long|null} [intValue] ConfigurationParameterValue intValue
             * @property {boolean|null} [boolValue] ConfigurationParameterValue boolValue
             * @property {string|null} [stringValue] ConfigurationParameterValue stringValue
             */

            /**
             * Constructs a new ConfigurationParameterValue.
             * @memberof cadompart.v0_2
             * @classdesc Represents a ConfigurationParameterValue.
             * @implements IConfigurationParameterValue
             * @constructor
             * @param {cadompart.v0_2.IConfigurationParameterValue=} [properties] Properties to set
             */
            function ConfigurationParameterValue(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConfigurationParameterValue parameterId.
             * @member {string} parameterId
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @instance
             */
            ConfigurationParameterValue.prototype.parameterId = "";

            /**
             * ConfigurationParameterValue floatValue.
             * @member {number|null|undefined} floatValue
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @instance
             */
            ConfigurationParameterValue.prototype.floatValue = null;

            /**
             * ConfigurationParameterValue intValue.
             * @member {number|Long|null|undefined} intValue
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @instance
             */
            ConfigurationParameterValue.prototype.intValue = null;

            /**
             * ConfigurationParameterValue boolValue.
             * @member {boolean|null|undefined} boolValue
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @instance
             */
            ConfigurationParameterValue.prototype.boolValue = null;

            /**
             * ConfigurationParameterValue stringValue.
             * @member {string|null|undefined} stringValue
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @instance
             */
            ConfigurationParameterValue.prototype.stringValue = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ConfigurationParameterValue.prototype, "_floatValue", {
                get: $util.oneOfGetter($oneOfFields = ["floatValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ConfigurationParameterValue.prototype, "_intValue", {
                get: $util.oneOfGetter($oneOfFields = ["intValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ConfigurationParameterValue.prototype, "_boolValue", {
                get: $util.oneOfGetter($oneOfFields = ["boolValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            Object.defineProperty(ConfigurationParameterValue.prototype, "_stringValue", {
                get: $util.oneOfGetter($oneOfFields = ["stringValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ConfigurationParameterValue instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {cadompart.v0_2.IConfigurationParameterValue=} [properties] Properties to set
             * @returns {cadompart.v0_2.ConfigurationParameterValue} ConfigurationParameterValue instance
             */
            ConfigurationParameterValue.create = function create(properties) {
                return new ConfigurationParameterValue(properties);
            };

            /**
             * Encodes the specified ConfigurationParameterValue message. Does not implicitly {@link cadompart.v0_2.ConfigurationParameterValue.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {cadompart.v0_2.IConfigurationParameterValue} message ConfigurationParameterValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigurationParameterValue.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.parameterId != null && Object.hasOwnProperty.call(message, "parameterId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.parameterId);
                if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.floatValue);
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.intValue);
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolValue);
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.stringValue);
                return writer;
            };

            /**
             * Encodes the specified ConfigurationParameterValue message, length delimited. Does not implicitly {@link cadompart.v0_2.ConfigurationParameterValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {cadompart.v0_2.IConfigurationParameterValue} message ConfigurationParameterValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConfigurationParameterValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ConfigurationParameterValue message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.ConfigurationParameterValue} ConfigurationParameterValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigurationParameterValue.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.ConfigurationParameterValue();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.parameterId = reader.string();
                            break;
                        }
                    case 2: {
                            message.floatValue = reader.double();
                            break;
                        }
                    case 3: {
                            message.intValue = reader.int64();
                            break;
                        }
                    case 4: {
                            message.boolValue = reader.bool();
                            break;
                        }
                    case 5: {
                            message.stringValue = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a ConfigurationParameterValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.ConfigurationParameterValue} ConfigurationParameterValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConfigurationParameterValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConfigurationParameterValue message.
             * @function verify
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConfigurationParameterValue.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.parameterId != null && Object.hasOwnProperty.call(message, "parameterId"))
                    if (!$util.isString(message.parameterId))
                        return "parameterId: string expected";
                if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue")) {
                    properties._floatValue = 1;
                    if (typeof message.floatValue !== "number")
                        return "floatValue: number expected";
                }
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue")) {
                    properties._intValue = 1;
                    if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                        return "intValue: integer|Long expected";
                }
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue")) {
                    properties._boolValue = 1;
                    if (typeof message.boolValue !== "boolean")
                        return "boolValue: boolean expected";
                }
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue")) {
                    properties._stringValue = 1;
                    if (!$util.isString(message.stringValue))
                        return "stringValue: string expected";
                }
                return null;
            };

            /**
             * Creates a ConfigurationParameterValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.ConfigurationParameterValue} ConfigurationParameterValue
             */
            ConfigurationParameterValue.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.ConfigurationParameterValue)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.ConfigurationParameterValue: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.ConfigurationParameterValue();
                if (object.parameterId != null)
                    message.parameterId = String(object.parameterId);
                if (object.floatValue != null)
                    message.floatValue = Number(object.floatValue);
                if (object.intValue != null)
                    if ($util.Long)
                        message.intValue = $util.Long.fromValue(object.intValue, false);
                    else if (typeof object.intValue === "string")
                        message.intValue = parseInt(object.intValue, 10);
                    else if (typeof object.intValue === "number")
                        message.intValue = object.intValue;
                    else if (typeof object.intValue === "object")
                        message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                if (object.boolValue != null)
                    message.boolValue = Boolean(object.boolValue);
                if (object.stringValue != null)
                    message.stringValue = String(object.stringValue);
                return message;
            };

            /**
             * Creates a plain object from a ConfigurationParameterValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {cadompart.v0_2.ConfigurationParameterValue} message ConfigurationParameterValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConfigurationParameterValue.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.parameterId = "";
                if (message.parameterId != null && Object.hasOwnProperty.call(message, "parameterId"))
                    object.parameterId = message.parameterId;
                if (message.floatValue != null && Object.hasOwnProperty.call(message, "floatValue")) {
                    object.floatValue = options.json && !isFinite(message.floatValue) ? String(message.floatValue) : message.floatValue;
                    if (options.oneofs)
                        object._floatValue = "floatValue";
                }
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue")) {
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.intValue = typeof message.intValue === "number" ? BigInt(message.intValue) : $util.Long.fromBits(message.intValue.low >>> 0, message.intValue.high >>> 0, false).toBigInt();
                    else if (typeof message.intValue === "number")
                        object.intValue = options.longs === String ? String(message.intValue) : message.intValue;
                    else
                        object.intValue = options.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                    if (options.oneofs)
                        object._intValue = "intValue";
                }
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue")) {
                    object.boolValue = message.boolValue;
                    if (options.oneofs)
                        object._boolValue = "boolValue";
                }
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs)
                        object._stringValue = "stringValue";
                }
                return object;
            };

            /**
             * Converts this ConfigurationParameterValue to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConfigurationParameterValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ConfigurationParameterValue
             * @function getTypeUrl
             * @memberof cadompart.v0_2.ConfigurationParameterValue
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ConfigurationParameterValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.ConfigurationParameterValue";
            };

            return ConfigurationParameterValue;
        })();

        v0_2.Configuration = (function() {

            /**
             * Properties of a Configuration.
             * @memberof cadompart.v0_2
             * @interface IConfiguration
             * @property {string|null} [id] Configuration id
             * @property {string|null} [name] Configuration name
             * @property {Array.<cadompart.v0_2.IConfigurationParameterValue>|null} [parameterValues] Configuration parameterValues
             * @property {Array.<string>|null} [suppressedFeatureIds] Configuration suppressedFeatureIds
             * @property {boolean|null} [isDefault] Configuration isDefault
             */

            /**
             * Constructs a new Configuration.
             * @memberof cadompart.v0_2
             * @classdesc Represents a Configuration.
             * @implements IConfiguration
             * @constructor
             * @param {cadompart.v0_2.IConfiguration=} [properties] Properties to set
             */
            function Configuration(properties) {
                this.parameterValues = [];
                this.suppressedFeatureIds = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Configuration id.
             * @member {string} id
             * @memberof cadompart.v0_2.Configuration
             * @instance
             */
            Configuration.prototype.id = "";

            /**
             * Configuration name.
             * @member {string} name
             * @memberof cadompart.v0_2.Configuration
             * @instance
             */
            Configuration.prototype.name = "";

            /**
             * Configuration parameterValues.
             * @member {Array.<cadompart.v0_2.IConfigurationParameterValue>} parameterValues
             * @memberof cadompart.v0_2.Configuration
             * @instance
             */
            Configuration.prototype.parameterValues = $util.emptyArray;

            /**
             * Configuration suppressedFeatureIds.
             * @member {Array.<string>} suppressedFeatureIds
             * @memberof cadompart.v0_2.Configuration
             * @instance
             */
            Configuration.prototype.suppressedFeatureIds = $util.emptyArray;

            /**
             * Configuration isDefault.
             * @member {boolean} isDefault
             * @memberof cadompart.v0_2.Configuration
             * @instance
             */
            Configuration.prototype.isDefault = false;

            /**
             * Creates a new Configuration instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {cadompart.v0_2.IConfiguration=} [properties] Properties to set
             * @returns {cadompart.v0_2.Configuration} Configuration instance
             */
            Configuration.create = function create(properties) {
                return new Configuration(properties);
            };

            /**
             * Encodes the specified Configuration message. Does not implicitly {@link cadompart.v0_2.Configuration.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {cadompart.v0_2.IConfiguration} message Configuration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Configuration.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.parameterValues != null && message.parameterValues.length)
                    for (let i = 0; i < message.parameterValues.length; ++i)
                        $root.cadompart.v0_2.ConfigurationParameterValue.encode(message.parameterValues[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                if (message.suppressedFeatureIds != null && message.suppressedFeatureIds.length)
                    for (let i = 0; i < message.suppressedFeatureIds.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.suppressedFeatureIds[i]);
                if (message.isDefault != null && Object.hasOwnProperty.call(message, "isDefault"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isDefault);
                return writer;
            };

            /**
             * Encodes the specified Configuration message, length delimited. Does not implicitly {@link cadompart.v0_2.Configuration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {cadompart.v0_2.IConfiguration} message Configuration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Configuration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Configuration message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.Configuration} Configuration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Configuration.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.Configuration();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            if (!(message.parameterValues && message.parameterValues.length))
                                message.parameterValues = [];
                            message.parameterValues.push($root.cadompart.v0_2.ConfigurationParameterValue.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 4: {
                            if (!(message.suppressedFeatureIds && message.suppressedFeatureIds.length))
                                message.suppressedFeatureIds = [];
                            message.suppressedFeatureIds.push(reader.string());
                            break;
                        }
                    case 5: {
                            message.isDefault = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a Configuration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.Configuration} Configuration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Configuration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Configuration message.
             * @function verify
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Configuration.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.parameterValues != null && Object.hasOwnProperty.call(message, "parameterValues")) {
                    if (!Array.isArray(message.parameterValues))
                        return "parameterValues: array expected";
                    for (let i = 0; i < message.parameterValues.length; ++i) {
                        let error = $root.cadompart.v0_2.ConfigurationParameterValue.verify(message.parameterValues[i], long + 1);
                        if (error)
                            return "parameterValues." + error;
                    }
                }
                if (message.suppressedFeatureIds != null && Object.hasOwnProperty.call(message, "suppressedFeatureIds")) {
                    if (!Array.isArray(message.suppressedFeatureIds))
                        return "suppressedFeatureIds: array expected";
                    for (let i = 0; i < message.suppressedFeatureIds.length; ++i)
                        if (!$util.isString(message.suppressedFeatureIds[i]))
                            return "suppressedFeatureIds: string[] expected";
                }
                if (message.isDefault != null && Object.hasOwnProperty.call(message, "isDefault"))
                    if (typeof message.isDefault !== "boolean")
                        return "isDefault: boolean expected";
                return null;
            };

            /**
             * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.Configuration} Configuration
             */
            Configuration.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.Configuration)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.Configuration: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.Configuration();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.parameterValues) {
                    if (!Array.isArray(object.parameterValues))
                        throw TypeError(".cadompart.v0_2.Configuration.parameterValues: array expected");
                    message.parameterValues = [];
                    for (let i = 0; i < object.parameterValues.length; ++i) {
                        if (!$util.isObject(object.parameterValues[i]))
                            throw TypeError(".cadompart.v0_2.Configuration.parameterValues: object expected");
                        message.parameterValues[i] = $root.cadompart.v0_2.ConfigurationParameterValue.fromObject(object.parameterValues[i], long + 1);
                    }
                }
                if (object.suppressedFeatureIds) {
                    if (!Array.isArray(object.suppressedFeatureIds))
                        throw TypeError(".cadompart.v0_2.Configuration.suppressedFeatureIds: array expected");
                    message.suppressedFeatureIds = [];
                    for (let i = 0; i < object.suppressedFeatureIds.length; ++i)
                        message.suppressedFeatureIds[i] = String(object.suppressedFeatureIds[i]);
                }
                if (object.isDefault != null)
                    message.isDefault = Boolean(object.isDefault);
                return message;
            };

            /**
             * Creates a plain object from a Configuration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {cadompart.v0_2.Configuration} message Configuration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Configuration.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.parameterValues = [];
                    object.suppressedFeatureIds = [];
                }
                if (options.defaults) {
                    object.id = "";
                    object.name = "";
                    object.isDefault = false;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.parameterValues && message.parameterValues.length) {
                    object.parameterValues = [];
                    for (let j = 0; j < message.parameterValues.length; ++j)
                        object.parameterValues[j] = $root.cadompart.v0_2.ConfigurationParameterValue.toObject(message.parameterValues[j], options, q + 1);
                }
                if (message.suppressedFeatureIds && message.suppressedFeatureIds.length) {
                    object.suppressedFeatureIds = [];
                    for (let j = 0; j < message.suppressedFeatureIds.length; ++j)
                        object.suppressedFeatureIds[j] = message.suppressedFeatureIds[j];
                }
                if (message.isDefault != null && Object.hasOwnProperty.call(message, "isDefault"))
                    object.isDefault = message.isDefault;
                return object;
            };

            /**
             * Converts this Configuration to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.Configuration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Configuration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Configuration
             * @function getTypeUrl
             * @memberof cadompart.v0_2.Configuration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Configuration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.Configuration";
            };

            return Configuration;
        })();

        v0_2.CadompartFile = (function() {

            /**
             * Properties of a CadompartFile.
             * @memberof cadompart.v0_2
             * @interface ICadompartFile
             * @property {number|null} [versionMajor] CadompartFile versionMajor
             * @property {number|null} [versionMinor] CadompartFile versionMinor
             * @property {string|null} [name] CadompartFile name
             * @property {string|null} [description] CadompartFile description
             * @property {cadompart.v0_2.LengthUnit|null} [units] CadompartFile units
             * @property {cadompart.v0_2.UpAxis|null} [upAxis] CadompartFile upAxis
             * @property {Array.<cadompart.v0_2.IParameter>|null} [parameters] CadompartFile parameters
             * @property {Array.<cadompart.v0_2.IDatumPlane>|null} [datumPlanes] CadompartFile datumPlanes
             * @property {Array.<cadompart.v0_2.IDatumAxis>|null} [datumAxes] CadompartFile datumAxes
             * @property {Array.<cadompart.v0_2.IDatumPoint>|null} [datumPoints] CadompartFile datumPoints
             * @property {Array.<cadompart.v0_2.ICoordinateSystem>|null} [coordinateSystems] CadompartFile coordinateSystems
             * @property {Array.<cadompart.v0_2.IFeature>|null} [features] CadompartFile features
             * @property {Array.<cadompart.v0_2.IConfiguration>|null} [configurations] CadompartFile configurations
             * @property {string|null} [activeConfigurationId] CadompartFile activeConfigurationId
             */

            /**
             * Constructs a new CadompartFile.
             * @memberof cadompart.v0_2
             * @classdesc Represents a CadompartFile.
             * @implements ICadompartFile
             * @constructor
             * @param {cadompart.v0_2.ICadompartFile=} [properties] Properties to set
             */
            function CadompartFile(properties) {
                this.parameters = [];
                this.datumPlanes = [];
                this.datumAxes = [];
                this.datumPoints = [];
                this.coordinateSystems = [];
                this.features = [];
                this.configurations = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CadompartFile versionMajor.
             * @member {number} versionMajor
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.versionMajor = 0;

            /**
             * CadompartFile versionMinor.
             * @member {number} versionMinor
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.versionMinor = 0;

            /**
             * CadompartFile name.
             * @member {string} name
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.name = "";

            /**
             * CadompartFile description.
             * @member {string} description
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.description = "";

            /**
             * CadompartFile units.
             * @member {cadompart.v0_2.LengthUnit} units
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.units = 0;

            /**
             * CadompartFile upAxis.
             * @member {cadompart.v0_2.UpAxis} upAxis
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.upAxis = 0;

            /**
             * CadompartFile parameters.
             * @member {Array.<cadompart.v0_2.IParameter>} parameters
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.parameters = $util.emptyArray;

            /**
             * CadompartFile datumPlanes.
             * @member {Array.<cadompart.v0_2.IDatumPlane>} datumPlanes
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.datumPlanes = $util.emptyArray;

            /**
             * CadompartFile datumAxes.
             * @member {Array.<cadompart.v0_2.IDatumAxis>} datumAxes
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.datumAxes = $util.emptyArray;

            /**
             * CadompartFile datumPoints.
             * @member {Array.<cadompart.v0_2.IDatumPoint>} datumPoints
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.datumPoints = $util.emptyArray;

            /**
             * CadompartFile coordinateSystems.
             * @member {Array.<cadompart.v0_2.ICoordinateSystem>} coordinateSystems
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.coordinateSystems = $util.emptyArray;

            /**
             * CadompartFile features.
             * @member {Array.<cadompart.v0_2.IFeature>} features
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.features = $util.emptyArray;

            /**
             * CadompartFile configurations.
             * @member {Array.<cadompart.v0_2.IConfiguration>} configurations
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.configurations = $util.emptyArray;

            /**
             * CadompartFile activeConfigurationId.
             * @member {string} activeConfigurationId
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             */
            CadompartFile.prototype.activeConfigurationId = "";

            /**
             * Creates a new CadompartFile instance using the specified properties.
             * @function create
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {cadompart.v0_2.ICadompartFile=} [properties] Properties to set
             * @returns {cadompart.v0_2.CadompartFile} CadompartFile instance
             */
            CadompartFile.create = function create(properties) {
                return new CadompartFile(properties);
            };

            /**
             * Encodes the specified CadompartFile message. Does not implicitly {@link cadompart.v0_2.CadompartFile.verify|verify} messages.
             * @function encode
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {cadompart.v0_2.ICadompartFile} message CadompartFile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CadompartFile.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.versionMajor != null && Object.hasOwnProperty.call(message, "versionMajor"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.versionMajor);
                if (message.versionMinor != null && Object.hasOwnProperty.call(message, "versionMinor"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.versionMinor);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
                if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.units);
                if (message.upAxis != null && Object.hasOwnProperty.call(message, "upAxis"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.upAxis);
                if (message.parameters != null && message.parameters.length)
                    for (let i = 0; i < message.parameters.length; ++i)
                        $root.cadompart.v0_2.Parameter.encode(message.parameters[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
                if (message.datumPlanes != null && message.datumPlanes.length)
                    for (let i = 0; i < message.datumPlanes.length; ++i)
                        $root.cadompart.v0_2.DatumPlane.encode(message.datumPlanes[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
                if (message.datumAxes != null && message.datumAxes.length)
                    for (let i = 0; i < message.datumAxes.length; ++i)
                        $root.cadompart.v0_2.DatumAxis.encode(message.datumAxes[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
                if (message.datumPoints != null && message.datumPoints.length)
                    for (let i = 0; i < message.datumPoints.length; ++i)
                        $root.cadompart.v0_2.DatumPoint.encode(message.datumPoints[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
                if (message.coordinateSystems != null && message.coordinateSystems.length)
                    for (let i = 0; i < message.coordinateSystems.length; ++i)
                        $root.cadompart.v0_2.CoordinateSystem.encode(message.coordinateSystems[i], writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
                if (message.features != null && message.features.length)
                    for (let i = 0; i < message.features.length; ++i)
                        $root.cadompart.v0_2.Feature.encode(message.features[i], writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
                if (message.configurations != null && message.configurations.length)
                    for (let i = 0; i < message.configurations.length; ++i)
                        $root.cadompart.v0_2.Configuration.encode(message.configurations[i], writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
                if (message.activeConfigurationId != null && Object.hasOwnProperty.call(message, "activeConfigurationId"))
                    writer.uint32(/* id 14, wireType 2 =*/114).string(message.activeConfigurationId);
                return writer;
            };

            /**
             * Encodes the specified CadompartFile message, length delimited. Does not implicitly {@link cadompart.v0_2.CadompartFile.verify|verify} messages.
             * @function encodeDelimited
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {cadompart.v0_2.ICadompartFile} message CadompartFile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CadompartFile.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a CadompartFile message from the specified reader or buffer.
             * @function decode
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {cadompart.v0_2.CadompartFile} CadompartFile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CadompartFile.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end, message;
                if (length === undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = new $root.cadompart.v0_2.CadompartFile();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.versionMajor = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.versionMinor = reader.uint32();
                            break;
                        }
                    case 3: {
                            message.name = reader.string();
                            break;
                        }
                    case 4: {
                            message.description = reader.string();
                            break;
                        }
                    case 5: {
                            message.units = reader.int32();
                            break;
                        }
                    case 6: {
                            message.upAxis = reader.int32();
                            break;
                        }
                    case 7: {
                            if (!(message.parameters && message.parameters.length))
                                message.parameters = [];
                            message.parameters.push($root.cadompart.v0_2.Parameter.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 8: {
                            if (!(message.datumPlanes && message.datumPlanes.length))
                                message.datumPlanes = [];
                            message.datumPlanes.push($root.cadompart.v0_2.DatumPlane.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 9: {
                            if (!(message.datumAxes && message.datumAxes.length))
                                message.datumAxes = [];
                            message.datumAxes.push($root.cadompart.v0_2.DatumAxis.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 10: {
                            if (!(message.datumPoints && message.datumPoints.length))
                                message.datumPoints = [];
                            message.datumPoints.push($root.cadompart.v0_2.DatumPoint.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 11: {
                            if (!(message.coordinateSystems && message.coordinateSystems.length))
                                message.coordinateSystems = [];
                            message.coordinateSystems.push($root.cadompart.v0_2.CoordinateSystem.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 12: {
                            if (!(message.features && message.features.length))
                                message.features = [];
                            message.features.push($root.cadompart.v0_2.Feature.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 13: {
                            if (!(message.configurations && message.configurations.length))
                                message.configurations = [];
                            message.configurations.push($root.cadompart.v0_2.Configuration.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 14: {
                            message.activeConfigurationId = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                if (length !== undefined) {
                    if (reader.pos !== end)
                        throw RangeError("index out of range");
                    reader.len = length;
                }
                return message;
            };

            /**
             * Decodes a CadompartFile message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {cadompart.v0_2.CadompartFile} CadompartFile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CadompartFile.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CadompartFile message.
             * @function verify
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CadompartFile.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.versionMajor != null && Object.hasOwnProperty.call(message, "versionMajor"))
                    if (!$util.isInteger(message.versionMajor))
                        return "versionMajor: integer expected";
                if (message.versionMinor != null && Object.hasOwnProperty.call(message, "versionMinor"))
                    if (!$util.isInteger(message.versionMinor))
                        return "versionMinor: integer expected";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    if (!$util.isString(message.description))
                        return "description: string expected";
                if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                    switch (message.units) {
                    default:
                        return "units: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.upAxis != null && Object.hasOwnProperty.call(message, "upAxis"))
                    switch (message.upAxis) {
                    default:
                        return "upAxis: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.parameters != null && Object.hasOwnProperty.call(message, "parameters")) {
                    if (!Array.isArray(message.parameters))
                        return "parameters: array expected";
                    for (let i = 0; i < message.parameters.length; ++i) {
                        let error = $root.cadompart.v0_2.Parameter.verify(message.parameters[i], long + 1);
                        if (error)
                            return "parameters." + error;
                    }
                }
                if (message.datumPlanes != null && Object.hasOwnProperty.call(message, "datumPlanes")) {
                    if (!Array.isArray(message.datumPlanes))
                        return "datumPlanes: array expected";
                    for (let i = 0; i < message.datumPlanes.length; ++i) {
                        let error = $root.cadompart.v0_2.DatumPlane.verify(message.datumPlanes[i], long + 1);
                        if (error)
                            return "datumPlanes." + error;
                    }
                }
                if (message.datumAxes != null && Object.hasOwnProperty.call(message, "datumAxes")) {
                    if (!Array.isArray(message.datumAxes))
                        return "datumAxes: array expected";
                    for (let i = 0; i < message.datumAxes.length; ++i) {
                        let error = $root.cadompart.v0_2.DatumAxis.verify(message.datumAxes[i], long + 1);
                        if (error)
                            return "datumAxes." + error;
                    }
                }
                if (message.datumPoints != null && Object.hasOwnProperty.call(message, "datumPoints")) {
                    if (!Array.isArray(message.datumPoints))
                        return "datumPoints: array expected";
                    for (let i = 0; i < message.datumPoints.length; ++i) {
                        let error = $root.cadompart.v0_2.DatumPoint.verify(message.datumPoints[i], long + 1);
                        if (error)
                            return "datumPoints." + error;
                    }
                }
                if (message.coordinateSystems != null && Object.hasOwnProperty.call(message, "coordinateSystems")) {
                    if (!Array.isArray(message.coordinateSystems))
                        return "coordinateSystems: array expected";
                    for (let i = 0; i < message.coordinateSystems.length; ++i) {
                        let error = $root.cadompart.v0_2.CoordinateSystem.verify(message.coordinateSystems[i], long + 1);
                        if (error)
                            return "coordinateSystems." + error;
                    }
                }
                if (message.features != null && Object.hasOwnProperty.call(message, "features")) {
                    if (!Array.isArray(message.features))
                        return "features: array expected";
                    for (let i = 0; i < message.features.length; ++i) {
                        let error = $root.cadompart.v0_2.Feature.verify(message.features[i], long + 1);
                        if (error)
                            return "features." + error;
                    }
                }
                if (message.configurations != null && Object.hasOwnProperty.call(message, "configurations")) {
                    if (!Array.isArray(message.configurations))
                        return "configurations: array expected";
                    for (let i = 0; i < message.configurations.length; ++i) {
                        let error = $root.cadompart.v0_2.Configuration.verify(message.configurations[i], long + 1);
                        if (error)
                            return "configurations." + error;
                    }
                }
                if (message.activeConfigurationId != null && Object.hasOwnProperty.call(message, "activeConfigurationId"))
                    if (!$util.isString(message.activeConfigurationId))
                        return "activeConfigurationId: string expected";
                return null;
            };

            /**
             * Creates a CadompartFile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {cadompart.v0_2.CadompartFile} CadompartFile
             */
            CadompartFile.fromObject = function fromObject(object, long) {
                if (object instanceof $root.cadompart.v0_2.CadompartFile)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".cadompart.v0_2.CadompartFile: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.cadompart.v0_2.CadompartFile();
                if (object.versionMajor != null)
                    message.versionMajor = object.versionMajor >>> 0;
                if (object.versionMinor != null)
                    message.versionMinor = object.versionMinor >>> 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.description != null)
                    message.description = String(object.description);
                switch (object.units) {
                default:
                    if (typeof object.units === "number") {
                        message.units = object.units;
                        break;
                    }
                    break;
                case "LENGTH_UNIT_UNSPECIFIED":
                case 0:
                    message.units = 0;
                    break;
                case "LENGTH_UNIT_METRES":
                case 1:
                    message.units = 1;
                    break;
                case "LENGTH_UNIT_MILLIMETRES":
                case 2:
                    message.units = 2;
                    break;
                case "LENGTH_UNIT_INCHES":
                case 3:
                    message.units = 3;
                    break;
                }
                switch (object.upAxis) {
                default:
                    if (typeof object.upAxis === "number") {
                        message.upAxis = object.upAxis;
                        break;
                    }
                    break;
                case "UP_AXIS_UNSPECIFIED":
                case 0:
                    message.upAxis = 0;
                    break;
                case "UP_AXIS_Y":
                case 1:
                    message.upAxis = 1;
                    break;
                case "UP_AXIS_Z":
                case 2:
                    message.upAxis = 2;
                    break;
                }
                if (object.parameters) {
                    if (!Array.isArray(object.parameters))
                        throw TypeError(".cadompart.v0_2.CadompartFile.parameters: array expected");
                    message.parameters = [];
                    for (let i = 0; i < object.parameters.length; ++i) {
                        if (!$util.isObject(object.parameters[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.parameters: object expected");
                        message.parameters[i] = $root.cadompart.v0_2.Parameter.fromObject(object.parameters[i], long + 1);
                    }
                }
                if (object.datumPlanes) {
                    if (!Array.isArray(object.datumPlanes))
                        throw TypeError(".cadompart.v0_2.CadompartFile.datumPlanes: array expected");
                    message.datumPlanes = [];
                    for (let i = 0; i < object.datumPlanes.length; ++i) {
                        if (!$util.isObject(object.datumPlanes[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.datumPlanes: object expected");
                        message.datumPlanes[i] = $root.cadompart.v0_2.DatumPlane.fromObject(object.datumPlanes[i], long + 1);
                    }
                }
                if (object.datumAxes) {
                    if (!Array.isArray(object.datumAxes))
                        throw TypeError(".cadompart.v0_2.CadompartFile.datumAxes: array expected");
                    message.datumAxes = [];
                    for (let i = 0; i < object.datumAxes.length; ++i) {
                        if (!$util.isObject(object.datumAxes[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.datumAxes: object expected");
                        message.datumAxes[i] = $root.cadompart.v0_2.DatumAxis.fromObject(object.datumAxes[i], long + 1);
                    }
                }
                if (object.datumPoints) {
                    if (!Array.isArray(object.datumPoints))
                        throw TypeError(".cadompart.v0_2.CadompartFile.datumPoints: array expected");
                    message.datumPoints = [];
                    for (let i = 0; i < object.datumPoints.length; ++i) {
                        if (!$util.isObject(object.datumPoints[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.datumPoints: object expected");
                        message.datumPoints[i] = $root.cadompart.v0_2.DatumPoint.fromObject(object.datumPoints[i], long + 1);
                    }
                }
                if (object.coordinateSystems) {
                    if (!Array.isArray(object.coordinateSystems))
                        throw TypeError(".cadompart.v0_2.CadompartFile.coordinateSystems: array expected");
                    message.coordinateSystems = [];
                    for (let i = 0; i < object.coordinateSystems.length; ++i) {
                        if (!$util.isObject(object.coordinateSystems[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.coordinateSystems: object expected");
                        message.coordinateSystems[i] = $root.cadompart.v0_2.CoordinateSystem.fromObject(object.coordinateSystems[i], long + 1);
                    }
                }
                if (object.features) {
                    if (!Array.isArray(object.features))
                        throw TypeError(".cadompart.v0_2.CadompartFile.features: array expected");
                    message.features = [];
                    for (let i = 0; i < object.features.length; ++i) {
                        if (!$util.isObject(object.features[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.features: object expected");
                        message.features[i] = $root.cadompart.v0_2.Feature.fromObject(object.features[i], long + 1);
                    }
                }
                if (object.configurations) {
                    if (!Array.isArray(object.configurations))
                        throw TypeError(".cadompart.v0_2.CadompartFile.configurations: array expected");
                    message.configurations = [];
                    for (let i = 0; i < object.configurations.length; ++i) {
                        if (!$util.isObject(object.configurations[i]))
                            throw TypeError(".cadompart.v0_2.CadompartFile.configurations: object expected");
                        message.configurations[i] = $root.cadompart.v0_2.Configuration.fromObject(object.configurations[i], long + 1);
                    }
                }
                if (object.activeConfigurationId != null)
                    message.activeConfigurationId = String(object.activeConfigurationId);
                return message;
            };

            /**
             * Creates a plain object from a CadompartFile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {cadompart.v0_2.CadompartFile} message CadompartFile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CadompartFile.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults) {
                    object.parameters = [];
                    object.datumPlanes = [];
                    object.datumAxes = [];
                    object.datumPoints = [];
                    object.coordinateSystems = [];
                    object.features = [];
                    object.configurations = [];
                }
                if (options.defaults) {
                    object.versionMajor = 0;
                    object.versionMinor = 0;
                    object.name = "";
                    object.description = "";
                    object.units = options.enums === String ? "LENGTH_UNIT_UNSPECIFIED" : 0;
                    object.upAxis = options.enums === String ? "UP_AXIS_UNSPECIFIED" : 0;
                    object.activeConfigurationId = "";
                }
                if (message.versionMajor != null && Object.hasOwnProperty.call(message, "versionMajor"))
                    object.versionMajor = message.versionMajor;
                if (message.versionMinor != null && Object.hasOwnProperty.call(message, "versionMinor"))
                    object.versionMinor = message.versionMinor;
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    object.description = message.description;
                if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                    object.units = options.enums === String ? $root.cadompart.v0_2.LengthUnit[message.units] === undefined ? message.units : $root.cadompart.v0_2.LengthUnit[message.units] : message.units;
                if (message.upAxis != null && Object.hasOwnProperty.call(message, "upAxis"))
                    object.upAxis = options.enums === String ? $root.cadompart.v0_2.UpAxis[message.upAxis] === undefined ? message.upAxis : $root.cadompart.v0_2.UpAxis[message.upAxis] : message.upAxis;
                if (message.parameters && message.parameters.length) {
                    object.parameters = [];
                    for (let j = 0; j < message.parameters.length; ++j)
                        object.parameters[j] = $root.cadompart.v0_2.Parameter.toObject(message.parameters[j], options, q + 1);
                }
                if (message.datumPlanes && message.datumPlanes.length) {
                    object.datumPlanes = [];
                    for (let j = 0; j < message.datumPlanes.length; ++j)
                        object.datumPlanes[j] = $root.cadompart.v0_2.DatumPlane.toObject(message.datumPlanes[j], options, q + 1);
                }
                if (message.datumAxes && message.datumAxes.length) {
                    object.datumAxes = [];
                    for (let j = 0; j < message.datumAxes.length; ++j)
                        object.datumAxes[j] = $root.cadompart.v0_2.DatumAxis.toObject(message.datumAxes[j], options, q + 1);
                }
                if (message.datumPoints && message.datumPoints.length) {
                    object.datumPoints = [];
                    for (let j = 0; j < message.datumPoints.length; ++j)
                        object.datumPoints[j] = $root.cadompart.v0_2.DatumPoint.toObject(message.datumPoints[j], options, q + 1);
                }
                if (message.coordinateSystems && message.coordinateSystems.length) {
                    object.coordinateSystems = [];
                    for (let j = 0; j < message.coordinateSystems.length; ++j)
                        object.coordinateSystems[j] = $root.cadompart.v0_2.CoordinateSystem.toObject(message.coordinateSystems[j], options, q + 1);
                }
                if (message.features && message.features.length) {
                    object.features = [];
                    for (let j = 0; j < message.features.length; ++j)
                        object.features[j] = $root.cadompart.v0_2.Feature.toObject(message.features[j], options, q + 1);
                }
                if (message.configurations && message.configurations.length) {
                    object.configurations = [];
                    for (let j = 0; j < message.configurations.length; ++j)
                        object.configurations[j] = $root.cadompart.v0_2.Configuration.toObject(message.configurations[j], options, q + 1);
                }
                if (message.activeConfigurationId != null && Object.hasOwnProperty.call(message, "activeConfigurationId"))
                    object.activeConfigurationId = message.activeConfigurationId;
                return object;
            };

            /**
             * Converts this CadompartFile to JSON.
             * @function toJSON
             * @memberof cadompart.v0_2.CadompartFile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CadompartFile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CadompartFile
             * @function getTypeUrl
             * @memberof cadompart.v0_2.CadompartFile
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CadompartFile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/cadompart.v0_2.CadompartFile";
            };

            return CadompartFile;
        })();

        return v0_2;
    })();

    return cadompart;
})();

export { $root as default };
