import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace cadompart. */
export namespace cadompart {

    /** Namespace v0_2. */
    namespace v0_2 {

        /** LengthUnit enum. */
        enum LengthUnit {
            LENGTH_UNIT_UNSPECIFIED = 0,
            LENGTH_UNIT_METRES = 1,
            LENGTH_UNIT_MILLIMETRES = 2,
            LENGTH_UNIT_INCHES = 3
        }

        /** UpAxis enum. */
        enum UpAxis {
            UP_AXIS_UNSPECIFIED = 0,
            UP_AXIS_Y = 1,
            UP_AXIS_Z = 2
        }

        /** ParamType enum. */
        enum ParamType {
            PARAM_TYPE_UNSPECIFIED = 0,
            PARAM_TYPE_FLOAT = 1,
            PARAM_TYPE_INT = 2,
            PARAM_TYPE_BOOL = 3,
            PARAM_TYPE_STRING = 4,
            PARAM_TYPE_VEC2 = 5,
            PARAM_TYPE_VEC3 = 6,
            PARAM_TYPE_ANGLE = 7
        }

        /** EndCondition enum. */
        enum EndCondition {
            END_CONDITION_UNSPECIFIED = 0,
            END_CONDITION_BLIND = 1,
            END_CONDITION_THROUGH_ALL = 2,
            END_CONDITION_TO_FACE = 3,
            END_CONDITION_TO_VERTEX = 4,
            END_CONDITION_MIDPLANE = 5,
            END_CONDITION_OFFSET_FROM_FACE = 6
        }

        /** BooleanOp enum. */
        enum BooleanOp {
            BOOLEAN_OP_UNSPECIFIED = 0,
            BOOLEAN_OP_UNION = 1,
            BOOLEAN_OP_SUBTRACT = 2,
            BOOLEAN_OP_INTERSECT = 3
        }

        /** HoleType enum. */
        enum HoleType {
            HOLE_TYPE_UNSPECIFIED = 0,
            HOLE_TYPE_SIMPLE = 1,
            HOLE_TYPE_COUNTERBORE = 2,
            HOLE_TYPE_COUNTERSINK = 3,
            HOLE_TYPE_TAP = 4
        }

        /** DraftSide enum. */
        enum DraftSide {
            DRAFT_SIDE_UNSPECIFIED = 0,
            DRAFT_SIDE_NEUTRAL_PLANE = 1,
            DRAFT_SIDE_PARTING_LINE = 2,
            DRAFT_SIDE_STEP = 3
        }

        /** PatternInstanceCountMode enum. */
        enum PatternInstanceCountMode {
            PATTERN_COUNT_TOTAL_INCLUDING_SOURCE = 0
        }

        /** SketchConstraintKind enum. */
        enum SketchConstraintKind {
            SKETCH_CONSTRAINT_UNSPECIFIED = 0,
            SKETCH_CONSTRAINT_COINCIDENT = 1,
            SKETCH_CONSTRAINT_HORIZONTAL = 2,
            SKETCH_CONSTRAINT_VERTICAL = 3,
            SKETCH_CONSTRAINT_PARALLEL = 4,
            SKETCH_CONSTRAINT_PERPENDICULAR = 5,
            SKETCH_CONSTRAINT_TANGENT = 6,
            SKETCH_CONSTRAINT_EQUAL = 7,
            SKETCH_CONSTRAINT_MIDPOINT = 8,
            SKETCH_CONSTRAINT_SYMMETRIC = 9,
            SKETCH_CONSTRAINT_FIXED = 10,
            SKETCH_CONSTRAINT_CONCENTRIC = 11,
            SKETCH_CONSTRAINT_COLLINEAR = 12,
            SKETCH_CONSTRAINT_DISTANCE = 13,
            SKETCH_CONSTRAINT_ANGLE = 14,
            SKETCH_CONSTRAINT_RADIUS = 15,
            SKETCH_CONSTRAINT_DIAMETER = 16,
            SKETCH_CONSTRAINT_LENGTH = 17
        }

        /** SketchPointRefKind enum. */
        enum SketchPointRefKind {
            SKETCH_POINT_REF_UNSPECIFIED = 0,
            SKETCH_POINT_REF_CURVE_START = 1,
            SKETCH_POINT_REF_CURVE_END = 2,
            SKETCH_POINT_REF_CURVE_CENTER = 3,
            SKETCH_POINT_REF_EXPLICIT = 4
        }

        /** Properties of a Vec2. */
        interface IVec2 {

            /** Vec2 x */
            x?: (number|null);

            /** Vec2 y */
            y?: (number|null);
        }

        /** Represents a Vec2. */
        class Vec2 implements IVec2 {

            /**
             * Constructs a new Vec2.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IVec2);

            /** Vec2 x. */
            public x: number;

            /** Vec2 y. */
            public y: number;

            /**
             * Creates a new Vec2 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Vec2 instance
             */
            public static create(properties?: cadompart.v0_2.IVec2): cadompart.v0_2.Vec2;

            /**
             * Encodes the specified Vec2 message. Does not implicitly {@link cadompart.v0_2.Vec2.verify|verify} messages.
             * @param message Vec2 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IVec2, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Vec2 message, length delimited. Does not implicitly {@link cadompart.v0_2.Vec2.verify|verify} messages.
             * @param message Vec2 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IVec2, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Vec2 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Vec2
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.Vec2;

            /**
             * Decodes a Vec2 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Vec2
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.Vec2;

            /**
             * Verifies a Vec2 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Vec2 message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Vec2
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.Vec2;

            /**
             * Creates a plain object from a Vec2 message. Also converts values to other types if specified.
             * @param message Vec2
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.Vec2, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Vec2 to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Vec2
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Vec3. */
        interface IVec3 {

            /** Vec3 x */
            x?: (number|null);

            /** Vec3 y */
            y?: (number|null);

            /** Vec3 z */
            z?: (number|null);
        }

        /** Represents a Vec3. */
        class Vec3 implements IVec3 {

            /**
             * Constructs a new Vec3.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IVec3);

            /** Vec3 x. */
            public x: number;

            /** Vec3 y. */
            public y: number;

            /** Vec3 z. */
            public z: number;

            /**
             * Creates a new Vec3 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Vec3 instance
             */
            public static create(properties?: cadompart.v0_2.IVec3): cadompart.v0_2.Vec3;

            /**
             * Encodes the specified Vec3 message. Does not implicitly {@link cadompart.v0_2.Vec3.verify|verify} messages.
             * @param message Vec3 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IVec3, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Vec3 message, length delimited. Does not implicitly {@link cadompart.v0_2.Vec3.verify|verify} messages.
             * @param message Vec3 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IVec3, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Vec3 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Vec3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.Vec3;

            /**
             * Decodes a Vec3 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Vec3
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.Vec3;

            /**
             * Verifies a Vec3 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Vec3 message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Vec3
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.Vec3;

            /**
             * Creates a plain object from a Vec3 message. Also converts values to other types if specified.
             * @param message Vec3
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.Vec3, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Vec3 to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Vec3
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Mat4. */
        interface IMat4 {

            /** Mat4 m */
            m?: (number[]|null);
        }

        /** Represents a Mat4. */
        class Mat4 implements IMat4 {

            /**
             * Constructs a new Mat4.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IMat4);

            /** Mat4 m. */
            public m: number[];

            /**
             * Creates a new Mat4 instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Mat4 instance
             */
            public static create(properties?: cadompart.v0_2.IMat4): cadompart.v0_2.Mat4;

            /**
             * Encodes the specified Mat4 message. Does not implicitly {@link cadompart.v0_2.Mat4.verify|verify} messages.
             * @param message Mat4 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IMat4, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Mat4 message, length delimited. Does not implicitly {@link cadompart.v0_2.Mat4.verify|verify} messages.
             * @param message Mat4 message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IMat4, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Mat4 message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Mat4
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.Mat4;

            /**
             * Decodes a Mat4 message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Mat4
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.Mat4;

            /**
             * Verifies a Mat4 message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Mat4 message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Mat4
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.Mat4;

            /**
             * Creates a plain object from a Mat4 message. Also converts values to other types if specified.
             * @param message Mat4
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.Mat4, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Mat4 to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Mat4
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Parameter. */
        interface IParameter {

            /** Parameter id */
            id?: (string|null);

            /** Parameter name */
            name?: (string|null);

            /** Parameter type */
            type?: (cadompart.v0_2.ParamType|null);

            /** Parameter floatValue */
            floatValue?: (number|null);

            /** Parameter intValue */
            intValue?: (number|Long|null);

            /** Parameter boolValue */
            boolValue?: (boolean|null);

            /** Parameter stringValue */
            stringValue?: (string|null);

            /** Parameter vec2Value */
            vec2Value?: (cadompart.v0_2.IVec2|null);

            /** Parameter vec3Value */
            vec3Value?: (cadompart.v0_2.IVec3|null);

            /** Parameter unit */
            unit?: (string|null);

            /** Parameter expression */
            expression?: (string|null);

            /** Parameter driven */
            driven?: (boolean|null);

            /** Parameter minValue */
            minValue?: (number|null);

            /** Parameter maxValue */
            maxValue?: (number|null);

            /** Parameter hasMin */
            hasMin?: (boolean|null);

            /** Parameter hasMax */
            hasMax?: (boolean|null);
        }

        /** Represents a Parameter. */
        class Parameter implements IParameter {

            /**
             * Constructs a new Parameter.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IParameter);

            /** Parameter id. */
            public id: string;

            /** Parameter name. */
            public name: string;

            /** Parameter type. */
            public type: cadompart.v0_2.ParamType;

            /** Parameter floatValue. */
            public floatValue?: (number|null);

            /** Parameter intValue. */
            public intValue?: (number|Long|null);

            /** Parameter boolValue. */
            public boolValue?: (boolean|null);

            /** Parameter stringValue. */
            public stringValue?: (string|null);

            /** Parameter vec2Value. */
            public vec2Value?: (cadompart.v0_2.IVec2|null);

            /** Parameter vec3Value. */
            public vec3Value?: (cadompart.v0_2.IVec3|null);

            /** Parameter unit. */
            public unit: string;

            /** Parameter expression. */
            public expression: string;

            /** Parameter driven. */
            public driven: boolean;

            /** Parameter minValue. */
            public minValue: number;

            /** Parameter maxValue. */
            public maxValue: number;

            /** Parameter hasMin. */
            public hasMin: boolean;

            /** Parameter hasMax. */
            public hasMax: boolean;

            /**
             * Creates a new Parameter instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Parameter instance
             */
            public static create(properties?: cadompart.v0_2.IParameter): cadompart.v0_2.Parameter;

            /**
             * Encodes the specified Parameter message. Does not implicitly {@link cadompart.v0_2.Parameter.verify|verify} messages.
             * @param message Parameter message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IParameter, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Parameter message, length delimited. Does not implicitly {@link cadompart.v0_2.Parameter.verify|verify} messages.
             * @param message Parameter message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IParameter, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Parameter message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Parameter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.Parameter;

            /**
             * Decodes a Parameter message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Parameter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.Parameter;

            /**
             * Verifies a Parameter message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Parameter message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Parameter
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.Parameter;

            /**
             * Creates a plain object from a Parameter message. Also converts values to other types if specified.
             * @param message Parameter
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.Parameter, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Parameter to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Parameter
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a FaceRef. */
        interface IFaceRef {

            /** FaceRef id */
            id?: (string|null);
        }

        /** Represents a FaceRef. */
        class FaceRef implements IFaceRef {

            /**
             * Constructs a new FaceRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IFaceRef);

            /** FaceRef id. */
            public id: string;

            /**
             * Creates a new FaceRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FaceRef instance
             */
            public static create(properties?: cadompart.v0_2.IFaceRef): cadompart.v0_2.FaceRef;

            /**
             * Encodes the specified FaceRef message. Does not implicitly {@link cadompart.v0_2.FaceRef.verify|verify} messages.
             * @param message FaceRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IFaceRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FaceRef message, length delimited. Does not implicitly {@link cadompart.v0_2.FaceRef.verify|verify} messages.
             * @param message FaceRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IFaceRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FaceRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FaceRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.FaceRef;

            /**
             * Decodes a FaceRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FaceRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.FaceRef;

            /**
             * Verifies a FaceRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FaceRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FaceRef
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.FaceRef;

            /**
             * Creates a plain object from a FaceRef message. Also converts values to other types if specified.
             * @param message FaceRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.FaceRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FaceRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for FaceRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an EdgeRef. */
        interface IEdgeRef {

            /** EdgeRef id */
            id?: (string|null);
        }

        /** Represents an EdgeRef. */
        class EdgeRef implements IEdgeRef {

            /**
             * Constructs a new EdgeRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IEdgeRef);

            /** EdgeRef id. */
            public id: string;

            /**
             * Creates a new EdgeRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EdgeRef instance
             */
            public static create(properties?: cadompart.v0_2.IEdgeRef): cadompart.v0_2.EdgeRef;

            /**
             * Encodes the specified EdgeRef message. Does not implicitly {@link cadompart.v0_2.EdgeRef.verify|verify} messages.
             * @param message EdgeRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IEdgeRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EdgeRef message, length delimited. Does not implicitly {@link cadompart.v0_2.EdgeRef.verify|verify} messages.
             * @param message EdgeRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IEdgeRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EdgeRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EdgeRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.EdgeRef;

            /**
             * Decodes an EdgeRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EdgeRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.EdgeRef;

            /**
             * Verifies an EdgeRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EdgeRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EdgeRef
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.EdgeRef;

            /**
             * Creates a plain object from an EdgeRef message. Also converts values to other types if specified.
             * @param message EdgeRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.EdgeRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EdgeRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for EdgeRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a VertexRef. */
        interface IVertexRef {

            /** VertexRef id */
            id?: (string|null);
        }

        /** Represents a VertexRef. */
        class VertexRef implements IVertexRef {

            /**
             * Constructs a new VertexRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IVertexRef);

            /** VertexRef id. */
            public id: string;

            /**
             * Creates a new VertexRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VertexRef instance
             */
            public static create(properties?: cadompart.v0_2.IVertexRef): cadompart.v0_2.VertexRef;

            /**
             * Encodes the specified VertexRef message. Does not implicitly {@link cadompart.v0_2.VertexRef.verify|verify} messages.
             * @param message VertexRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IVertexRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VertexRef message, length delimited. Does not implicitly {@link cadompart.v0_2.VertexRef.verify|verify} messages.
             * @param message VertexRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IVertexRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VertexRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VertexRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.VertexRef;

            /**
             * Decodes a VertexRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VertexRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.VertexRef;

            /**
             * Verifies a VertexRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VertexRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VertexRef
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.VertexRef;

            /**
             * Creates a plain object from a VertexRef message. Also converts values to other types if specified.
             * @param message VertexRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.VertexRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VertexRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for VertexRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BodyRef. */
        interface IBodyRef {

            /** BodyRef id */
            id?: (string|null);
        }

        /** Represents a BodyRef. */
        class BodyRef implements IBodyRef {

            /**
             * Constructs a new BodyRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IBodyRef);

            /** BodyRef id. */
            public id: string;

            /**
             * Creates a new BodyRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BodyRef instance
             */
            public static create(properties?: cadompart.v0_2.IBodyRef): cadompart.v0_2.BodyRef;

            /**
             * Encodes the specified BodyRef message. Does not implicitly {@link cadompart.v0_2.BodyRef.verify|verify} messages.
             * @param message BodyRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IBodyRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BodyRef message, length delimited. Does not implicitly {@link cadompart.v0_2.BodyRef.verify|verify} messages.
             * @param message BodyRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IBodyRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BodyRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BodyRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.BodyRef;

            /**
             * Decodes a BodyRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BodyRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.BodyRef;

            /**
             * Verifies a BodyRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BodyRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BodyRef
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.BodyRef;

            /**
             * Creates a plain object from a BodyRef message. Also converts values to other types if specified.
             * @param message BodyRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.BodyRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BodyRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BodyRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DatumPlane. */
        interface IDatumPlane {

            /** DatumPlane id */
            id?: (string|null);

            /** DatumPlane name */
            name?: (string|null);

            /** DatumPlane origin */
            origin?: (cadompart.v0_2.IVec3|null);

            /** DatumPlane normal */
            normal?: (cadompart.v0_2.IVec3|null);

            /** DatumPlane fromPlaneId */
            fromPlaneId?: (string|null);

            /** DatumPlane offset */
            offset?: (number|null);
        }

        /** Represents a DatumPlane. */
        class DatumPlane implements IDatumPlane {

            /**
             * Constructs a new DatumPlane.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IDatumPlane);

            /** DatumPlane id. */
            public id: string;

            /** DatumPlane name. */
            public name: string;

            /** DatumPlane origin. */
            public origin?: (cadompart.v0_2.IVec3|null);

            /** DatumPlane normal. */
            public normal?: (cadompart.v0_2.IVec3|null);

            /** DatumPlane fromPlaneId. */
            public fromPlaneId: string;

            /** DatumPlane offset. */
            public offset: number;

            /**
             * Creates a new DatumPlane instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DatumPlane instance
             */
            public static create(properties?: cadompart.v0_2.IDatumPlane): cadompart.v0_2.DatumPlane;

            /**
             * Encodes the specified DatumPlane message. Does not implicitly {@link cadompart.v0_2.DatumPlane.verify|verify} messages.
             * @param message DatumPlane message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IDatumPlane, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DatumPlane message, length delimited. Does not implicitly {@link cadompart.v0_2.DatumPlane.verify|verify} messages.
             * @param message DatumPlane message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IDatumPlane, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DatumPlane message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DatumPlane
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.DatumPlane;

            /**
             * Decodes a DatumPlane message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DatumPlane
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.DatumPlane;

            /**
             * Verifies a DatumPlane message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DatumPlane message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DatumPlane
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.DatumPlane;

            /**
             * Creates a plain object from a DatumPlane message. Also converts values to other types if specified.
             * @param message DatumPlane
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.DatumPlane, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DatumPlane to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DatumPlane
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DatumAxis. */
        interface IDatumAxis {

            /** DatumAxis id */
            id?: (string|null);

            /** DatumAxis name */
            name?: (string|null);

            /** DatumAxis origin */
            origin?: (cadompart.v0_2.IVec3|null);

            /** DatumAxis direction */
            direction?: (cadompart.v0_2.IVec3|null);
        }

        /** Represents a DatumAxis. */
        class DatumAxis implements IDatumAxis {

            /**
             * Constructs a new DatumAxis.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IDatumAxis);

            /** DatumAxis id. */
            public id: string;

            /** DatumAxis name. */
            public name: string;

            /** DatumAxis origin. */
            public origin?: (cadompart.v0_2.IVec3|null);

            /** DatumAxis direction. */
            public direction?: (cadompart.v0_2.IVec3|null);

            /**
             * Creates a new DatumAxis instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DatumAxis instance
             */
            public static create(properties?: cadompart.v0_2.IDatumAxis): cadompart.v0_2.DatumAxis;

            /**
             * Encodes the specified DatumAxis message. Does not implicitly {@link cadompart.v0_2.DatumAxis.verify|verify} messages.
             * @param message DatumAxis message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IDatumAxis, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DatumAxis message, length delimited. Does not implicitly {@link cadompart.v0_2.DatumAxis.verify|verify} messages.
             * @param message DatumAxis message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IDatumAxis, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DatumAxis message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DatumAxis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.DatumAxis;

            /**
             * Decodes a DatumAxis message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DatumAxis
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.DatumAxis;

            /**
             * Verifies a DatumAxis message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DatumAxis message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DatumAxis
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.DatumAxis;

            /**
             * Creates a plain object from a DatumAxis message. Also converts values to other types if specified.
             * @param message DatumAxis
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.DatumAxis, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DatumAxis to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DatumAxis
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DatumPoint. */
        interface IDatumPoint {

            /** DatumPoint id */
            id?: (string|null);

            /** DatumPoint name */
            name?: (string|null);

            /** DatumPoint position */
            position?: (cadompart.v0_2.IVec3|null);
        }

        /** Represents a DatumPoint. */
        class DatumPoint implements IDatumPoint {

            /**
             * Constructs a new DatumPoint.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IDatumPoint);

            /** DatumPoint id. */
            public id: string;

            /** DatumPoint name. */
            public name: string;

            /** DatumPoint position. */
            public position?: (cadompart.v0_2.IVec3|null);

            /**
             * Creates a new DatumPoint instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DatumPoint instance
             */
            public static create(properties?: cadompart.v0_2.IDatumPoint): cadompart.v0_2.DatumPoint;

            /**
             * Encodes the specified DatumPoint message. Does not implicitly {@link cadompart.v0_2.DatumPoint.verify|verify} messages.
             * @param message DatumPoint message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IDatumPoint, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DatumPoint message, length delimited. Does not implicitly {@link cadompart.v0_2.DatumPoint.verify|verify} messages.
             * @param message DatumPoint message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IDatumPoint, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DatumPoint message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DatumPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.DatumPoint;

            /**
             * Decodes a DatumPoint message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DatumPoint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.DatumPoint;

            /**
             * Verifies a DatumPoint message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DatumPoint message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DatumPoint
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.DatumPoint;

            /**
             * Creates a plain object from a DatumPoint message. Also converts values to other types if specified.
             * @param message DatumPoint
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.DatumPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DatumPoint to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DatumPoint
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CoordinateSystem. */
        interface ICoordinateSystem {

            /** CoordinateSystem id */
            id?: (string|null);

            /** CoordinateSystem name */
            name?: (string|null);

            /** CoordinateSystem transform */
            transform?: (cadompart.v0_2.IMat4|null);
        }

        /** Represents a CoordinateSystem. */
        class CoordinateSystem implements ICoordinateSystem {

            /**
             * Constructs a new CoordinateSystem.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ICoordinateSystem);

            /** CoordinateSystem id. */
            public id: string;

            /** CoordinateSystem name. */
            public name: string;

            /** CoordinateSystem transform. */
            public transform?: (cadompart.v0_2.IMat4|null);

            /**
             * Creates a new CoordinateSystem instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CoordinateSystem instance
             */
            public static create(properties?: cadompart.v0_2.ICoordinateSystem): cadompart.v0_2.CoordinateSystem;

            /**
             * Encodes the specified CoordinateSystem message. Does not implicitly {@link cadompart.v0_2.CoordinateSystem.verify|verify} messages.
             * @param message CoordinateSystem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ICoordinateSystem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CoordinateSystem message, length delimited. Does not implicitly {@link cadompart.v0_2.CoordinateSystem.verify|verify} messages.
             * @param message CoordinateSystem message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ICoordinateSystem, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CoordinateSystem message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CoordinateSystem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.CoordinateSystem;

            /**
             * Decodes a CoordinateSystem message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CoordinateSystem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.CoordinateSystem;

            /**
             * Verifies a CoordinateSystem message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CoordinateSystem message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CoordinateSystem
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.CoordinateSystem;

            /**
             * Creates a plain object from a CoordinateSystem message. Also converts values to other types if specified.
             * @param message CoordinateSystem
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.CoordinateSystem, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CoordinateSystem to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CoordinateSystem
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchPointRef. */
        interface ISketchPointRef {

            /** SketchPointRef kind */
            kind?: (cadompart.v0_2.SketchPointRefKind|null);

            /** SketchPointRef curveIndex */
            curveIndex?: (number|null);

            /** SketchPointRef explicitPoint */
            explicitPoint?: (cadompart.v0_2.IVec2|null);
        }

        /** Represents a SketchPointRef. */
        class SketchPointRef implements ISketchPointRef {

            /**
             * Constructs a new SketchPointRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchPointRef);

            /** SketchPointRef kind. */
            public kind: cadompart.v0_2.SketchPointRefKind;

            /** SketchPointRef curveIndex. */
            public curveIndex: number;

            /** SketchPointRef explicitPoint. */
            public explicitPoint?: (cadompart.v0_2.IVec2|null);

            /**
             * Creates a new SketchPointRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchPointRef instance
             */
            public static create(properties?: cadompart.v0_2.ISketchPointRef): cadompart.v0_2.SketchPointRef;

            /**
             * Encodes the specified SketchPointRef message. Does not implicitly {@link cadompart.v0_2.SketchPointRef.verify|verify} messages.
             * @param message SketchPointRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchPointRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchPointRef message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchPointRef.verify|verify} messages.
             * @param message SketchPointRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchPointRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchPointRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchPointRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchPointRef;

            /**
             * Decodes a SketchPointRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchPointRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchPointRef;

            /**
             * Verifies a SketchPointRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchPointRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchPointRef
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchPointRef;

            /**
             * Creates a plain object from a SketchPointRef message. Also converts values to other types if specified.
             * @param message SketchPointRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchPointRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchPointRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchPointRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchLine. */
        interface ISketchLine {

            /** SketchLine id */
            id?: (string|null);

            /** SketchLine a */
            a?: (cadompart.v0_2.IVec2|null);

            /** SketchLine b */
            b?: (cadompart.v0_2.IVec2|null);

            /** SketchLine construction */
            construction?: (boolean|null);
        }

        /** Represents a SketchLine. */
        class SketchLine implements ISketchLine {

            /**
             * Constructs a new SketchLine.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchLine);

            /** SketchLine id. */
            public id: string;

            /** SketchLine a. */
            public a?: (cadompart.v0_2.IVec2|null);

            /** SketchLine b. */
            public b?: (cadompart.v0_2.IVec2|null);

            /** SketchLine construction. */
            public construction: boolean;

            /**
             * Creates a new SketchLine instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchLine instance
             */
            public static create(properties?: cadompart.v0_2.ISketchLine): cadompart.v0_2.SketchLine;

            /**
             * Encodes the specified SketchLine message. Does not implicitly {@link cadompart.v0_2.SketchLine.verify|verify} messages.
             * @param message SketchLine message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchLine, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchLine message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchLine.verify|verify} messages.
             * @param message SketchLine message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchLine, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchLine message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchLine
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchLine;

            /**
             * Decodes a SketchLine message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchLine
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchLine;

            /**
             * Verifies a SketchLine message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchLine message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchLine
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchLine;

            /**
             * Creates a plain object from a SketchLine message. Also converts values to other types if specified.
             * @param message SketchLine
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchLine, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchLine to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchLine
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchCircle. */
        interface ISketchCircle {

            /** SketchCircle id */
            id?: (string|null);

            /** SketchCircle center */
            center?: (cadompart.v0_2.IVec2|null);

            /** SketchCircle radius */
            radius?: (number|null);

            /** SketchCircle construction */
            construction?: (boolean|null);
        }

        /** Represents a SketchCircle. */
        class SketchCircle implements ISketchCircle {

            /**
             * Constructs a new SketchCircle.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchCircle);

            /** SketchCircle id. */
            public id: string;

            /** SketchCircle center. */
            public center?: (cadompart.v0_2.IVec2|null);

            /** SketchCircle radius. */
            public radius: number;

            /** SketchCircle construction. */
            public construction: boolean;

            /**
             * Creates a new SketchCircle instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchCircle instance
             */
            public static create(properties?: cadompart.v0_2.ISketchCircle): cadompart.v0_2.SketchCircle;

            /**
             * Encodes the specified SketchCircle message. Does not implicitly {@link cadompart.v0_2.SketchCircle.verify|verify} messages.
             * @param message SketchCircle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchCircle, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchCircle message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchCircle.verify|verify} messages.
             * @param message SketchCircle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchCircle, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchCircle message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchCircle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchCircle;

            /**
             * Decodes a SketchCircle message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchCircle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchCircle;

            /**
             * Verifies a SketchCircle message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchCircle message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchCircle
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchCircle;

            /**
             * Creates a plain object from a SketchCircle message. Also converts values to other types if specified.
             * @param message SketchCircle
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchCircle, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchCircle to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchCircle
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchArc. */
        interface ISketchArc {

            /** SketchArc id */
            id?: (string|null);

            /** SketchArc center */
            center?: (cadompart.v0_2.IVec2|null);

            /** SketchArc radius */
            radius?: (number|null);

            /** SketchArc startAngleRad */
            startAngleRad?: (number|null);

            /** SketchArc endAngleRad */
            endAngleRad?: (number|null);

            /** SketchArc construction */
            construction?: (boolean|null);
        }

        /** Represents a SketchArc. */
        class SketchArc implements ISketchArc {

            /**
             * Constructs a new SketchArc.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchArc);

            /** SketchArc id. */
            public id: string;

            /** SketchArc center. */
            public center?: (cadompart.v0_2.IVec2|null);

            /** SketchArc radius. */
            public radius: number;

            /** SketchArc startAngleRad. */
            public startAngleRad: number;

            /** SketchArc endAngleRad. */
            public endAngleRad: number;

            /** SketchArc construction. */
            public construction: boolean;

            /**
             * Creates a new SketchArc instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchArc instance
             */
            public static create(properties?: cadompart.v0_2.ISketchArc): cadompart.v0_2.SketchArc;

            /**
             * Encodes the specified SketchArc message. Does not implicitly {@link cadompart.v0_2.SketchArc.verify|verify} messages.
             * @param message SketchArc message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchArc, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchArc message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchArc.verify|verify} messages.
             * @param message SketchArc message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchArc, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchArc message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchArc
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchArc;

            /**
             * Decodes a SketchArc message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchArc
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchArc;

            /**
             * Verifies a SketchArc message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchArc message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchArc
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchArc;

            /**
             * Creates a plain object from a SketchArc message. Also converts values to other types if specified.
             * @param message SketchArc
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchArc, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchArc to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchArc
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchEllipse. */
        interface ISketchEllipse {

            /** SketchEllipse id */
            id?: (string|null);

            /** SketchEllipse center */
            center?: (cadompart.v0_2.IVec2|null);

            /** SketchEllipse majorAxis */
            majorAxis?: (cadompart.v0_2.IVec2|null);

            /** SketchEllipse minorRadius */
            minorRadius?: (number|null);

            /** SketchEllipse construction */
            construction?: (boolean|null);
        }

        /** Represents a SketchEllipse. */
        class SketchEllipse implements ISketchEllipse {

            /**
             * Constructs a new SketchEllipse.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchEllipse);

            /** SketchEllipse id. */
            public id: string;

            /** SketchEllipse center. */
            public center?: (cadompart.v0_2.IVec2|null);

            /** SketchEllipse majorAxis. */
            public majorAxis?: (cadompart.v0_2.IVec2|null);

            /** SketchEllipse minorRadius. */
            public minorRadius: number;

            /** SketchEllipse construction. */
            public construction: boolean;

            /**
             * Creates a new SketchEllipse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchEllipse instance
             */
            public static create(properties?: cadompart.v0_2.ISketchEllipse): cadompart.v0_2.SketchEllipse;

            /**
             * Encodes the specified SketchEllipse message. Does not implicitly {@link cadompart.v0_2.SketchEllipse.verify|verify} messages.
             * @param message SketchEllipse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchEllipse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchEllipse message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchEllipse.verify|verify} messages.
             * @param message SketchEllipse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchEllipse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchEllipse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchEllipse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchEllipse;

            /**
             * Decodes a SketchEllipse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchEllipse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchEllipse;

            /**
             * Verifies a SketchEllipse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchEllipse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchEllipse
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchEllipse;

            /**
             * Creates a plain object from a SketchEllipse message. Also converts values to other types if specified.
             * @param message SketchEllipse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchEllipse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchEllipse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchEllipse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchSpline. */
        interface ISketchSpline {

            /** SketchSpline id */
            id?: (string|null);

            /** SketchSpline poles */
            poles?: (cadompart.v0_2.IVec2[]|null);

            /** SketchSpline knots */
            knots?: (number[]|null);

            /** SketchSpline degree */
            degree?: (number|null);

            /** SketchSpline closed */
            closed?: (boolean|null);

            /** SketchSpline construction */
            construction?: (boolean|null);
        }

        /** Represents a SketchSpline. */
        class SketchSpline implements ISketchSpline {

            /**
             * Constructs a new SketchSpline.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchSpline);

            /** SketchSpline id. */
            public id: string;

            /** SketchSpline poles. */
            public poles: cadompart.v0_2.IVec2[];

            /** SketchSpline knots. */
            public knots: number[];

            /** SketchSpline degree. */
            public degree: number;

            /** SketchSpline closed. */
            public closed: boolean;

            /** SketchSpline construction. */
            public construction: boolean;

            /**
             * Creates a new SketchSpline instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchSpline instance
             */
            public static create(properties?: cadompart.v0_2.ISketchSpline): cadompart.v0_2.SketchSpline;

            /**
             * Encodes the specified SketchSpline message. Does not implicitly {@link cadompart.v0_2.SketchSpline.verify|verify} messages.
             * @param message SketchSpline message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchSpline, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchSpline message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchSpline.verify|verify} messages.
             * @param message SketchSpline message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchSpline, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchSpline message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchSpline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchSpline;

            /**
             * Decodes a SketchSpline message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchSpline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchSpline;

            /**
             * Verifies a SketchSpline message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchSpline message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchSpline
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchSpline;

            /**
             * Creates a plain object from a SketchSpline message. Also converts values to other types if specified.
             * @param message SketchSpline
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchSpline, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchSpline to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchSpline
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchCurve. */
        interface ISketchCurve {

            /** SketchCurve line */
            line?: (cadompart.v0_2.ISketchLine|null);

            /** SketchCurve circle */
            circle?: (cadompart.v0_2.ISketchCircle|null);

            /** SketchCurve arc */
            arc?: (cadompart.v0_2.ISketchArc|null);

            /** SketchCurve ellipse */
            ellipse?: (cadompart.v0_2.ISketchEllipse|null);

            /** SketchCurve spline */
            spline?: (cadompart.v0_2.ISketchSpline|null);
        }

        /** Represents a SketchCurve. */
        class SketchCurve implements ISketchCurve {

            /**
             * Constructs a new SketchCurve.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchCurve);

            /** SketchCurve line. */
            public line?: (cadompart.v0_2.ISketchLine|null);

            /** SketchCurve circle. */
            public circle?: (cadompart.v0_2.ISketchCircle|null);

            /** SketchCurve arc. */
            public arc?: (cadompart.v0_2.ISketchArc|null);

            /** SketchCurve ellipse. */
            public ellipse?: (cadompart.v0_2.ISketchEllipse|null);

            /** SketchCurve spline. */
            public spline?: (cadompart.v0_2.ISketchSpline|null);

            /** SketchCurve curve. */
            public curve?: ("line"|"circle"|"arc"|"ellipse"|"spline");

            /**
             * Creates a new SketchCurve instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchCurve instance
             */
            public static create(properties?: cadompart.v0_2.ISketchCurve): cadompart.v0_2.SketchCurve;

            /**
             * Encodes the specified SketchCurve message. Does not implicitly {@link cadompart.v0_2.SketchCurve.verify|verify} messages.
             * @param message SketchCurve message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchCurve, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchCurve message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchCurve.verify|verify} messages.
             * @param message SketchCurve message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchCurve, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchCurve message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchCurve
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchCurve;

            /**
             * Decodes a SketchCurve message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchCurve
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchCurve;

            /**
             * Verifies a SketchCurve message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchCurve message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchCurve
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchCurve;

            /**
             * Creates a plain object from a SketchCurve message. Also converts values to other types if specified.
             * @param message SketchCurve
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchCurve, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchCurve to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchCurve
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchConstraint. */
        interface ISketchConstraint {

            /** SketchConstraint id */
            id?: (string|null);

            /** SketchConstraint kind */
            kind?: (cadompart.v0_2.SketchConstraintKind|null);

            /** SketchConstraint curveIndices */
            curveIndices?: (number[]|null);

            /** SketchConstraint points */
            points?: (cadompart.v0_2.ISketchPointRef[]|null);

            /** SketchConstraint value */
            value?: (number|null);

            /** SketchConstraint parameterId */
            parameterId?: (string|null);

            /** SketchConstraint mirrorLineCurveId */
            mirrorLineCurveId?: (string|null);
        }

        /** Represents a SketchConstraint. */
        class SketchConstraint implements ISketchConstraint {

            /**
             * Constructs a new SketchConstraint.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchConstraint);

            /** SketchConstraint id. */
            public id: string;

            /** SketchConstraint kind. */
            public kind: cadompart.v0_2.SketchConstraintKind;

            /** SketchConstraint curveIndices. */
            public curveIndices: number[];

            /** SketchConstraint points. */
            public points: cadompart.v0_2.ISketchPointRef[];

            /** SketchConstraint value. */
            public value?: (number|null);

            /** SketchConstraint parameterId. */
            public parameterId: string;

            /** SketchConstraint mirrorLineCurveId. */
            public mirrorLineCurveId: string;

            /**
             * Creates a new SketchConstraint instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchConstraint instance
             */
            public static create(properties?: cadompart.v0_2.ISketchConstraint): cadompart.v0_2.SketchConstraint;

            /**
             * Encodes the specified SketchConstraint message. Does not implicitly {@link cadompart.v0_2.SketchConstraint.verify|verify} messages.
             * @param message SketchConstraint message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchConstraint, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchConstraint message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchConstraint.verify|verify} messages.
             * @param message SketchConstraint message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchConstraint, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchConstraint message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchConstraint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchConstraint;

            /**
             * Decodes a SketchConstraint message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchConstraint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchConstraint;

            /**
             * Verifies a SketchConstraint message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchConstraint message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchConstraint
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchConstraint;

            /**
             * Creates a plain object from a SketchConstraint message. Also converts values to other types if specified.
             * @param message SketchConstraint
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchConstraint, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchConstraint to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchConstraint
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchLoop. */
        interface ISketchLoop {

            /** SketchLoop curveIndices */
            curveIndices?: (number[]|null);

            /** SketchLoop outer */
            outer?: (boolean|null);
        }

        /** Represents a SketchLoop. */
        class SketchLoop implements ISketchLoop {

            /**
             * Constructs a new SketchLoop.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchLoop);

            /** SketchLoop curveIndices. */
            public curveIndices: number[];

            /** SketchLoop outer. */
            public outer: boolean;

            /**
             * Creates a new SketchLoop instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchLoop instance
             */
            public static create(properties?: cadompart.v0_2.ISketchLoop): cadompart.v0_2.SketchLoop;

            /**
             * Encodes the specified SketchLoop message. Does not implicitly {@link cadompart.v0_2.SketchLoop.verify|verify} messages.
             * @param message SketchLoop message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchLoop, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchLoop message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchLoop.verify|verify} messages.
             * @param message SketchLoop message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchLoop, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchLoop message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchLoop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchLoop;

            /**
             * Decodes a SketchLoop message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchLoop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchLoop;

            /**
             * Verifies a SketchLoop message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchLoop message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchLoop
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchLoop;

            /**
             * Creates a plain object from a SketchLoop message. Also converts values to other types if specified.
             * @param message SketchLoop
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchLoop, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchLoop to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchLoop
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SketchFeature. */
        interface ISketchFeature {

            /** SketchFeature origin */
            origin?: (cadompart.v0_2.IVec3|null);

            /** SketchFeature xAxis */
            xAxis?: (cadompart.v0_2.IVec3|null);

            /** SketchFeature yAxis */
            yAxis?: (cadompart.v0_2.IVec3|null);

            /** SketchFeature datumPlaneId */
            datumPlaneId?: (string|null);

            /** SketchFeature curves */
            curves?: (cadompart.v0_2.ISketchCurve[]|null);

            /** SketchFeature constraints */
            constraints?: (cadompart.v0_2.ISketchConstraint[]|null);

            /** SketchFeature loops */
            loops?: (cadompart.v0_2.ISketchLoop[]|null);
        }

        /** Represents a SketchFeature. */
        class SketchFeature implements ISketchFeature {

            /**
             * Constructs a new SketchFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISketchFeature);

            /** SketchFeature origin. */
            public origin?: (cadompart.v0_2.IVec3|null);

            /** SketchFeature xAxis. */
            public xAxis?: (cadompart.v0_2.IVec3|null);

            /** SketchFeature yAxis. */
            public yAxis?: (cadompart.v0_2.IVec3|null);

            /** SketchFeature datumPlaneId. */
            public datumPlaneId: string;

            /** SketchFeature curves. */
            public curves: cadompart.v0_2.ISketchCurve[];

            /** SketchFeature constraints. */
            public constraints: cadompart.v0_2.ISketchConstraint[];

            /** SketchFeature loops. */
            public loops: cadompart.v0_2.ISketchLoop[];

            /**
             * Creates a new SketchFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SketchFeature instance
             */
            public static create(properties?: cadompart.v0_2.ISketchFeature): cadompart.v0_2.SketchFeature;

            /**
             * Encodes the specified SketchFeature message. Does not implicitly {@link cadompart.v0_2.SketchFeature.verify|verify} messages.
             * @param message SketchFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISketchFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SketchFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.SketchFeature.verify|verify} messages.
             * @param message SketchFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISketchFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SketchFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SketchFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SketchFeature;

            /**
             * Decodes a SketchFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SketchFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SketchFeature;

            /**
             * Verifies a SketchFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SketchFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SketchFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SketchFeature;

            /**
             * Creates a plain object from a SketchFeature message. Also converts values to other types if specified.
             * @param message SketchFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SketchFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SketchFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SketchFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an ExtrudeFeature. */
        interface IExtrudeFeature {

            /** ExtrudeFeature profileSketchId */
            profileSketchId?: (string|null);

            /** ExtrudeFeature endCondition */
            endCondition?: (cadompart.v0_2.EndCondition|null);

            /** ExtrudeFeature distance */
            distance?: (number|null);

            /** ExtrudeFeature distance2 */
            distance2?: (number|null);

            /** ExtrudeFeature twoDirection */
            twoDirection?: (boolean|null);

            /** ExtrudeFeature toFaceId */
            toFaceId?: (string|null);

            /** ExtrudeFeature toVertexId */
            toVertexId?: (string|null);

            /** ExtrudeFeature offsetFromFace */
            offsetFromFace?: (number|null);

            /** ExtrudeFeature direction */
            direction?: (cadompart.v0_2.IVec3|null);

            /** ExtrudeFeature draftAngleRad */
            draftAngleRad?: (number|null);

            /** ExtrudeFeature cut */
            cut?: (boolean|null);

            /** ExtrudeFeature merge */
            merge?: (boolean|null);
        }

        /** Represents an ExtrudeFeature. */
        class ExtrudeFeature implements IExtrudeFeature {

            /**
             * Constructs a new ExtrudeFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IExtrudeFeature);

            /** ExtrudeFeature profileSketchId. */
            public profileSketchId: string;

            /** ExtrudeFeature endCondition. */
            public endCondition: cadompart.v0_2.EndCondition;

            /** ExtrudeFeature distance. */
            public distance: number;

            /** ExtrudeFeature distance2. */
            public distance2: number;

            /** ExtrudeFeature twoDirection. */
            public twoDirection: boolean;

            /** ExtrudeFeature toFaceId. */
            public toFaceId: string;

            /** ExtrudeFeature toVertexId. */
            public toVertexId: string;

            /** ExtrudeFeature offsetFromFace. */
            public offsetFromFace: number;

            /** ExtrudeFeature direction. */
            public direction?: (cadompart.v0_2.IVec3|null);

            /** ExtrudeFeature draftAngleRad. */
            public draftAngleRad: number;

            /** ExtrudeFeature cut. */
            public cut: boolean;

            /** ExtrudeFeature merge. */
            public merge: boolean;

            /**
             * Creates a new ExtrudeFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExtrudeFeature instance
             */
            public static create(properties?: cadompart.v0_2.IExtrudeFeature): cadompart.v0_2.ExtrudeFeature;

            /**
             * Encodes the specified ExtrudeFeature message. Does not implicitly {@link cadompart.v0_2.ExtrudeFeature.verify|verify} messages.
             * @param message ExtrudeFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IExtrudeFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExtrudeFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ExtrudeFeature.verify|verify} messages.
             * @param message ExtrudeFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IExtrudeFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExtrudeFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExtrudeFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ExtrudeFeature;

            /**
             * Decodes an ExtrudeFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExtrudeFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ExtrudeFeature;

            /**
             * Verifies an ExtrudeFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExtrudeFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExtrudeFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ExtrudeFeature;

            /**
             * Creates a plain object from an ExtrudeFeature message. Also converts values to other types if specified.
             * @param message ExtrudeFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ExtrudeFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExtrudeFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ExtrudeFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RevolveFeature. */
        interface IRevolveFeature {

            /** RevolveFeature profileSketchId */
            profileSketchId?: (string|null);

            /** RevolveFeature axisOrigin */
            axisOrigin?: (cadompart.v0_2.IVec3|null);

            /** RevolveFeature axisDirection */
            axisDirection?: (cadompart.v0_2.IVec3|null);

            /** RevolveFeature datumAxisId */
            datumAxisId?: (string|null);

            /** RevolveFeature endCondition */
            endCondition?: (cadompart.v0_2.EndCondition|null);

            /** RevolveFeature angleRad */
            angleRad?: (number|null);

            /** RevolveFeature angle2Rad */
            angle2Rad?: (number|null);

            /** RevolveFeature twoDirection */
            twoDirection?: (boolean|null);

            /** RevolveFeature cut */
            cut?: (boolean|null);

            /** RevolveFeature merge */
            merge?: (boolean|null);
        }

        /** Represents a RevolveFeature. */
        class RevolveFeature implements IRevolveFeature {

            /**
             * Constructs a new RevolveFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IRevolveFeature);

            /** RevolveFeature profileSketchId. */
            public profileSketchId: string;

            /** RevolveFeature axisOrigin. */
            public axisOrigin?: (cadompart.v0_2.IVec3|null);

            /** RevolveFeature axisDirection. */
            public axisDirection?: (cadompart.v0_2.IVec3|null);

            /** RevolveFeature datumAxisId. */
            public datumAxisId: string;

            /** RevolveFeature endCondition. */
            public endCondition: cadompart.v0_2.EndCondition;

            /** RevolveFeature angleRad. */
            public angleRad: number;

            /** RevolveFeature angle2Rad. */
            public angle2Rad: number;

            /** RevolveFeature twoDirection. */
            public twoDirection: boolean;

            /** RevolveFeature cut. */
            public cut: boolean;

            /** RevolveFeature merge. */
            public merge: boolean;

            /**
             * Creates a new RevolveFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RevolveFeature instance
             */
            public static create(properties?: cadompart.v0_2.IRevolveFeature): cadompart.v0_2.RevolveFeature;

            /**
             * Encodes the specified RevolveFeature message. Does not implicitly {@link cadompart.v0_2.RevolveFeature.verify|verify} messages.
             * @param message RevolveFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IRevolveFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RevolveFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.RevolveFeature.verify|verify} messages.
             * @param message RevolveFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IRevolveFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RevolveFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RevolveFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.RevolveFeature;

            /**
             * Decodes a RevolveFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RevolveFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.RevolveFeature;

            /**
             * Verifies a RevolveFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RevolveFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RevolveFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.RevolveFeature;

            /**
             * Creates a plain object from a RevolveFeature message. Also converts values to other types if specified.
             * @param message RevolveFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.RevolveFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RevolveFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RevolveFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SweepFeature. */
        interface ISweepFeature {

            /** SweepFeature profileSketchId */
            profileSketchId?: (string|null);

            /** SweepFeature pathSketchId */
            pathSketchId?: (string|null);

            /** SweepFeature twistFollowPath */
            twistFollowPath?: (boolean|null);

            /** SweepFeature twistAngleRad */
            twistAngleRad?: (number|null);

            /** SweepFeature cut */
            cut?: (boolean|null);

            /** SweepFeature merge */
            merge?: (boolean|null);
        }

        /** Represents a SweepFeature. */
        class SweepFeature implements ISweepFeature {

            /**
             * Constructs a new SweepFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISweepFeature);

            /** SweepFeature profileSketchId. */
            public profileSketchId: string;

            /** SweepFeature pathSketchId. */
            public pathSketchId: string;

            /** SweepFeature twistFollowPath. */
            public twistFollowPath: boolean;

            /** SweepFeature twistAngleRad. */
            public twistAngleRad: number;

            /** SweepFeature cut. */
            public cut: boolean;

            /** SweepFeature merge. */
            public merge: boolean;

            /**
             * Creates a new SweepFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SweepFeature instance
             */
            public static create(properties?: cadompart.v0_2.ISweepFeature): cadompart.v0_2.SweepFeature;

            /**
             * Encodes the specified SweepFeature message. Does not implicitly {@link cadompart.v0_2.SweepFeature.verify|verify} messages.
             * @param message SweepFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISweepFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SweepFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.SweepFeature.verify|verify} messages.
             * @param message SweepFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISweepFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SweepFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SweepFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SweepFeature;

            /**
             * Decodes a SweepFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SweepFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SweepFeature;

            /**
             * Verifies a SweepFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SweepFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SweepFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SweepFeature;

            /**
             * Creates a plain object from a SweepFeature message. Also converts values to other types if specified.
             * @param message SweepFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SweepFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SweepFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SweepFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LoftProfileRef. */
        interface ILoftProfileRef {

            /** LoftProfileRef sketchId */
            sketchId?: (string|null);
        }

        /** Represents a LoftProfileRef. */
        class LoftProfileRef implements ILoftProfileRef {

            /**
             * Constructs a new LoftProfileRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ILoftProfileRef);

            /** LoftProfileRef sketchId. */
            public sketchId: string;

            /**
             * Creates a new LoftProfileRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LoftProfileRef instance
             */
            public static create(properties?: cadompart.v0_2.ILoftProfileRef): cadompart.v0_2.LoftProfileRef;

            /**
             * Encodes the specified LoftProfileRef message. Does not implicitly {@link cadompart.v0_2.LoftProfileRef.verify|verify} messages.
             * @param message LoftProfileRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ILoftProfileRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LoftProfileRef message, length delimited. Does not implicitly {@link cadompart.v0_2.LoftProfileRef.verify|verify} messages.
             * @param message LoftProfileRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ILoftProfileRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoftProfileRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoftProfileRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.LoftProfileRef;

            /**
             * Decodes a LoftProfileRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LoftProfileRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.LoftProfileRef;

            /**
             * Verifies a LoftProfileRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoftProfileRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoftProfileRef
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.LoftProfileRef;

            /**
             * Creates a plain object from a LoftProfileRef message. Also converts values to other types if specified.
             * @param message LoftProfileRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.LoftProfileRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoftProfileRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LoftProfileRef
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LoftFeature. */
        interface ILoftFeature {

            /** LoftFeature profiles */
            profiles?: (cadompart.v0_2.ILoftProfileRef[]|null);

            /** LoftFeature guideCurveSketchIds */
            guideCurveSketchIds?: (string[]|null);

            /** LoftFeature closed */
            closed?: (boolean|null);

            /** LoftFeature cut */
            cut?: (boolean|null);

            /** LoftFeature merge */
            merge?: (boolean|null);
        }

        /** Represents a LoftFeature. */
        class LoftFeature implements ILoftFeature {

            /**
             * Constructs a new LoftFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ILoftFeature);

            /** LoftFeature profiles. */
            public profiles: cadompart.v0_2.ILoftProfileRef[];

            /** LoftFeature guideCurveSketchIds. */
            public guideCurveSketchIds: string[];

            /** LoftFeature closed. */
            public closed: boolean;

            /** LoftFeature cut. */
            public cut: boolean;

            /** LoftFeature merge. */
            public merge: boolean;

            /**
             * Creates a new LoftFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LoftFeature instance
             */
            public static create(properties?: cadompart.v0_2.ILoftFeature): cadompart.v0_2.LoftFeature;

            /**
             * Encodes the specified LoftFeature message. Does not implicitly {@link cadompart.v0_2.LoftFeature.verify|verify} messages.
             * @param message LoftFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ILoftFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LoftFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.LoftFeature.verify|verify} messages.
             * @param message LoftFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ILoftFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoftFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.LoftFeature;

            /**
             * Decodes a LoftFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LoftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.LoftFeature;

            /**
             * Verifies a LoftFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoftFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoftFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.LoftFeature;

            /**
             * Creates a plain object from a LoftFeature message. Also converts values to other types if specified.
             * @param message LoftFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.LoftFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoftFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LoftFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a HoleFeature. */
        interface IHoleFeature {

            /** HoleFeature holeType */
            holeType?: (cadompart.v0_2.HoleType|null);

            /** HoleFeature position */
            position?: (cadompart.v0_2.IVec3|null);

            /** HoleFeature axis */
            axis?: (cadompart.v0_2.IVec3|null);

            /** HoleFeature sketchId */
            sketchId?: (string|null);

            /** HoleFeature diameter */
            diameter?: (number|null);

            /** HoleFeature depth */
            depth?: (number|null);

            /** HoleFeature endCondition */
            endCondition?: (cadompart.v0_2.EndCondition|null);

            /** HoleFeature counterboreDiameter */
            counterboreDiameter?: (number|null);

            /** HoleFeature counterboreDepth */
            counterboreDepth?: (number|null);

            /** HoleFeature countersinkAngleRad */
            countersinkAngleRad?: (number|null);

            /** HoleFeature countersinkDiameter */
            countersinkDiameter?: (number|null);

            /** HoleFeature tapDesignation */
            tapDesignation?: (string|null);

            /** HoleFeature thread */
            thread?: (boolean|null);
        }

        /** Represents a HoleFeature. */
        class HoleFeature implements IHoleFeature {

            /**
             * Constructs a new HoleFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IHoleFeature);

            /** HoleFeature holeType. */
            public holeType: cadompart.v0_2.HoleType;

            /** HoleFeature position. */
            public position?: (cadompart.v0_2.IVec3|null);

            /** HoleFeature axis. */
            public axis?: (cadompart.v0_2.IVec3|null);

            /** HoleFeature sketchId. */
            public sketchId: string;

            /** HoleFeature diameter. */
            public diameter: number;

            /** HoleFeature depth. */
            public depth: number;

            /** HoleFeature endCondition. */
            public endCondition: cadompart.v0_2.EndCondition;

            /** HoleFeature counterboreDiameter. */
            public counterboreDiameter: number;

            /** HoleFeature counterboreDepth. */
            public counterboreDepth: number;

            /** HoleFeature countersinkAngleRad. */
            public countersinkAngleRad: number;

            /** HoleFeature countersinkDiameter. */
            public countersinkDiameter: number;

            /** HoleFeature tapDesignation. */
            public tapDesignation: string;

            /** HoleFeature thread. */
            public thread: boolean;

            /**
             * Creates a new HoleFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HoleFeature instance
             */
            public static create(properties?: cadompart.v0_2.IHoleFeature): cadompart.v0_2.HoleFeature;

            /**
             * Encodes the specified HoleFeature message. Does not implicitly {@link cadompart.v0_2.HoleFeature.verify|verify} messages.
             * @param message HoleFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IHoleFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HoleFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.HoleFeature.verify|verify} messages.
             * @param message HoleFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IHoleFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HoleFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HoleFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.HoleFeature;

            /**
             * Decodes a HoleFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HoleFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.HoleFeature;

            /**
             * Verifies a HoleFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HoleFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HoleFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.HoleFeature;

            /**
             * Creates a plain object from a HoleFeature message. Also converts values to other types if specified.
             * @param message HoleFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.HoleFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HoleFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for HoleFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a FilletEdgeSet. */
        interface IFilletEdgeSet {

            /** FilletEdgeSet edges */
            edges?: (cadompart.v0_2.IEdgeRef[]|null);

            /** FilletEdgeSet radius */
            radius?: (number|null);

            /** FilletEdgeSet radiusParameterId */
            radiusParameterId?: (string|null);
        }

        /** Represents a FilletEdgeSet. */
        class FilletEdgeSet implements IFilletEdgeSet {

            /**
             * Constructs a new FilletEdgeSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IFilletEdgeSet);

            /** FilletEdgeSet edges. */
            public edges: cadompart.v0_2.IEdgeRef[];

            /** FilletEdgeSet radius. */
            public radius: number;

            /** FilletEdgeSet radiusParameterId. */
            public radiusParameterId: string;

            /**
             * Creates a new FilletEdgeSet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FilletEdgeSet instance
             */
            public static create(properties?: cadompart.v0_2.IFilletEdgeSet): cadompart.v0_2.FilletEdgeSet;

            /**
             * Encodes the specified FilletEdgeSet message. Does not implicitly {@link cadompart.v0_2.FilletEdgeSet.verify|verify} messages.
             * @param message FilletEdgeSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IFilletEdgeSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FilletEdgeSet message, length delimited. Does not implicitly {@link cadompart.v0_2.FilletEdgeSet.verify|verify} messages.
             * @param message FilletEdgeSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IFilletEdgeSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FilletEdgeSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FilletEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.FilletEdgeSet;

            /**
             * Decodes a FilletEdgeSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FilletEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.FilletEdgeSet;

            /**
             * Verifies a FilletEdgeSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FilletEdgeSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FilletEdgeSet
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.FilletEdgeSet;

            /**
             * Creates a plain object from a FilletEdgeSet message. Also converts values to other types if specified.
             * @param message FilletEdgeSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.FilletEdgeSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FilletEdgeSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for FilletEdgeSet
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a FilletFeature. */
        interface IFilletFeature {

            /** FilletFeature sets */
            sets?: (cadompart.v0_2.IFilletEdgeSet[]|null);

            /** FilletFeature tangentPropagate */
            tangentPropagate?: (boolean|null);
        }

        /** Represents a FilletFeature. */
        class FilletFeature implements IFilletFeature {

            /**
             * Constructs a new FilletFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IFilletFeature);

            /** FilletFeature sets. */
            public sets: cadompart.v0_2.IFilletEdgeSet[];

            /** FilletFeature tangentPropagate. */
            public tangentPropagate: boolean;

            /**
             * Creates a new FilletFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FilletFeature instance
             */
            public static create(properties?: cadompart.v0_2.IFilletFeature): cadompart.v0_2.FilletFeature;

            /**
             * Encodes the specified FilletFeature message. Does not implicitly {@link cadompart.v0_2.FilletFeature.verify|verify} messages.
             * @param message FilletFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IFilletFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FilletFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.FilletFeature.verify|verify} messages.
             * @param message FilletFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IFilletFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FilletFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FilletFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.FilletFeature;

            /**
             * Decodes a FilletFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FilletFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.FilletFeature;

            /**
             * Verifies a FilletFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FilletFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FilletFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.FilletFeature;

            /**
             * Creates a plain object from a FilletFeature message. Also converts values to other types if specified.
             * @param message FilletFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.FilletFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FilletFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for FilletFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ChamferEdgeSet. */
        interface IChamferEdgeSet {

            /** ChamferEdgeSet edges */
            edges?: (cadompart.v0_2.IEdgeRef[]|null);

            /** ChamferEdgeSet distance */
            distance?: (number|null);

            /** ChamferEdgeSet distance2 */
            distance2?: (number|null);

            /** ChamferEdgeSet angleRad */
            angleRad?: (number|null);
        }

        /** Represents a ChamferEdgeSet. */
        class ChamferEdgeSet implements IChamferEdgeSet {

            /**
             * Constructs a new ChamferEdgeSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IChamferEdgeSet);

            /** ChamferEdgeSet edges. */
            public edges: cadompart.v0_2.IEdgeRef[];

            /** ChamferEdgeSet distance. */
            public distance: number;

            /** ChamferEdgeSet distance2. */
            public distance2?: (number|null);

            /** ChamferEdgeSet angleRad. */
            public angleRad?: (number|null);

            /**
             * Creates a new ChamferEdgeSet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChamferEdgeSet instance
             */
            public static create(properties?: cadompart.v0_2.IChamferEdgeSet): cadompart.v0_2.ChamferEdgeSet;

            /**
             * Encodes the specified ChamferEdgeSet message. Does not implicitly {@link cadompart.v0_2.ChamferEdgeSet.verify|verify} messages.
             * @param message ChamferEdgeSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IChamferEdgeSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChamferEdgeSet message, length delimited. Does not implicitly {@link cadompart.v0_2.ChamferEdgeSet.verify|verify} messages.
             * @param message ChamferEdgeSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IChamferEdgeSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChamferEdgeSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChamferEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ChamferEdgeSet;

            /**
             * Decodes a ChamferEdgeSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChamferEdgeSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ChamferEdgeSet;

            /**
             * Verifies a ChamferEdgeSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChamferEdgeSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChamferEdgeSet
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ChamferEdgeSet;

            /**
             * Creates a plain object from a ChamferEdgeSet message. Also converts values to other types if specified.
             * @param message ChamferEdgeSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ChamferEdgeSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChamferEdgeSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChamferEdgeSet
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ChamferFeature. */
        interface IChamferFeature {

            /** ChamferFeature sets */
            sets?: (cadompart.v0_2.IChamferEdgeSet[]|null);

            /** ChamferFeature tangentPropagate */
            tangentPropagate?: (boolean|null);
        }

        /** Represents a ChamferFeature. */
        class ChamferFeature implements IChamferFeature {

            /**
             * Constructs a new ChamferFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IChamferFeature);

            /** ChamferFeature sets. */
            public sets: cadompart.v0_2.IChamferEdgeSet[];

            /** ChamferFeature tangentPropagate. */
            public tangentPropagate: boolean;

            /**
             * Creates a new ChamferFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChamferFeature instance
             */
            public static create(properties?: cadompart.v0_2.IChamferFeature): cadompart.v0_2.ChamferFeature;

            /**
             * Encodes the specified ChamferFeature message. Does not implicitly {@link cadompart.v0_2.ChamferFeature.verify|verify} messages.
             * @param message ChamferFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IChamferFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChamferFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ChamferFeature.verify|verify} messages.
             * @param message ChamferFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IChamferFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChamferFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChamferFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ChamferFeature;

            /**
             * Decodes a ChamferFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChamferFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ChamferFeature;

            /**
             * Verifies a ChamferFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChamferFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChamferFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ChamferFeature;

            /**
             * Creates a plain object from a ChamferFeature message. Also converts values to other types if specified.
             * @param message ChamferFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ChamferFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChamferFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChamferFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ShellFeature. */
        interface IShellFeature {

            /** ShellFeature facesToRemove */
            facesToRemove?: (cadompart.v0_2.IFaceRef[]|null);

            /** ShellFeature thickness */
            thickness?: (number|null);

            /** ShellFeature outward */
            outward?: (boolean|null);
        }

        /** Represents a ShellFeature. */
        class ShellFeature implements IShellFeature {

            /**
             * Constructs a new ShellFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IShellFeature);

            /** ShellFeature facesToRemove. */
            public facesToRemove: cadompart.v0_2.IFaceRef[];

            /** ShellFeature thickness. */
            public thickness: number;

            /** ShellFeature outward. */
            public outward: boolean;

            /**
             * Creates a new ShellFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ShellFeature instance
             */
            public static create(properties?: cadompart.v0_2.IShellFeature): cadompart.v0_2.ShellFeature;

            /**
             * Encodes the specified ShellFeature message. Does not implicitly {@link cadompart.v0_2.ShellFeature.verify|verify} messages.
             * @param message ShellFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IShellFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ShellFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ShellFeature.verify|verify} messages.
             * @param message ShellFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IShellFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ShellFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ShellFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ShellFeature;

            /**
             * Decodes a ShellFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ShellFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ShellFeature;

            /**
             * Verifies a ShellFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ShellFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ShellFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ShellFeature;

            /**
             * Creates a plain object from a ShellFeature message. Also converts values to other types if specified.
             * @param message ShellFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ShellFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ShellFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ShellFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DraftFeature. */
        interface IDraftFeature {

            /** DraftFeature sideType */
            sideType?: (cadompart.v0_2.DraftSide|null);

            /** DraftFeature neutralPlaneId */
            neutralPlaneId?: (string|null);

            /** DraftFeature faces */
            faces?: (cadompart.v0_2.IFaceRef[]|null);

            /** DraftFeature angleRad */
            angleRad?: (number|null);

            /** DraftFeature pullDirection */
            pullDirection?: (cadompart.v0_2.IVec3|null);
        }

        /** Represents a DraftFeature. */
        class DraftFeature implements IDraftFeature {

            /**
             * Constructs a new DraftFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IDraftFeature);

            /** DraftFeature sideType. */
            public sideType: cadompart.v0_2.DraftSide;

            /** DraftFeature neutralPlaneId. */
            public neutralPlaneId: string;

            /** DraftFeature faces. */
            public faces: cadompart.v0_2.IFaceRef[];

            /** DraftFeature angleRad. */
            public angleRad: number;

            /** DraftFeature pullDirection. */
            public pullDirection?: (cadompart.v0_2.IVec3|null);

            /**
             * Creates a new DraftFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DraftFeature instance
             */
            public static create(properties?: cadompart.v0_2.IDraftFeature): cadompart.v0_2.DraftFeature;

            /**
             * Encodes the specified DraftFeature message. Does not implicitly {@link cadompart.v0_2.DraftFeature.verify|verify} messages.
             * @param message DraftFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IDraftFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DraftFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.DraftFeature.verify|verify} messages.
             * @param message DraftFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IDraftFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DraftFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DraftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.DraftFeature;

            /**
             * Decodes a DraftFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DraftFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.DraftFeature;

            /**
             * Verifies a DraftFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DraftFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DraftFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.DraftFeature;

            /**
             * Creates a plain object from a DraftFeature message. Also converts values to other types if specified.
             * @param message DraftFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.DraftFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DraftFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DraftFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RibFeature. */
        interface IRibFeature {

            /** RibFeature profileSketchId */
            profileSketchId?: (string|null);

            /** RibFeature thickness */
            thickness?: (number|null);

            /** RibFeature draft */
            draft?: (boolean|null);

            /** RibFeature draftAngleRad */
            draftAngleRad?: (number|null);
        }

        /** Represents a RibFeature. */
        class RibFeature implements IRibFeature {

            /**
             * Constructs a new RibFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IRibFeature);

            /** RibFeature profileSketchId. */
            public profileSketchId: string;

            /** RibFeature thickness. */
            public thickness: number;

            /** RibFeature draft. */
            public draft: boolean;

            /** RibFeature draftAngleRad. */
            public draftAngleRad: number;

            /**
             * Creates a new RibFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RibFeature instance
             */
            public static create(properties?: cadompart.v0_2.IRibFeature): cadompart.v0_2.RibFeature;

            /**
             * Encodes the specified RibFeature message. Does not implicitly {@link cadompart.v0_2.RibFeature.verify|verify} messages.
             * @param message RibFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IRibFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RibFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.RibFeature.verify|verify} messages.
             * @param message RibFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IRibFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RibFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RibFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.RibFeature;

            /**
             * Decodes a RibFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RibFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.RibFeature;

            /**
             * Verifies a RibFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RibFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RibFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.RibFeature;

            /**
             * Creates a plain object from a RibFeature message. Also converts values to other types if specified.
             * @param message RibFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.RibFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RibFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RibFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MirrorFeature. */
        interface IMirrorFeature {

            /** MirrorFeature sourceFeatureId */
            sourceFeatureId?: (string|null);

            /** MirrorFeature mirrorPlaneId */
            mirrorPlaneId?: (string|null);

            /** MirrorFeature merge */
            merge?: (boolean|null);

            /** MirrorFeature copy */
            copy?: (boolean|null);
        }

        /** Represents a MirrorFeature. */
        class MirrorFeature implements IMirrorFeature {

            /**
             * Constructs a new MirrorFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IMirrorFeature);

            /** MirrorFeature sourceFeatureId. */
            public sourceFeatureId: string;

            /** MirrorFeature mirrorPlaneId. */
            public mirrorPlaneId: string;

            /** MirrorFeature merge. */
            public merge: boolean;

            /** MirrorFeature copy. */
            public copy: boolean;

            /**
             * Creates a new MirrorFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MirrorFeature instance
             */
            public static create(properties?: cadompart.v0_2.IMirrorFeature): cadompart.v0_2.MirrorFeature;

            /**
             * Encodes the specified MirrorFeature message. Does not implicitly {@link cadompart.v0_2.MirrorFeature.verify|verify} messages.
             * @param message MirrorFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IMirrorFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MirrorFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.MirrorFeature.verify|verify} messages.
             * @param message MirrorFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IMirrorFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MirrorFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MirrorFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.MirrorFeature;

            /**
             * Decodes a MirrorFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MirrorFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.MirrorFeature;

            /**
             * Verifies a MirrorFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MirrorFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MirrorFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.MirrorFeature;

            /**
             * Creates a plain object from a MirrorFeature message. Also converts values to other types if specified.
             * @param message MirrorFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.MirrorFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MirrorFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MirrorFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PatternLinearFeature. */
        interface IPatternLinearFeature {

            /** PatternLinearFeature sourceFeatureId */
            sourceFeatureId?: (string|null);

            /** PatternLinearFeature direction */
            direction?: (cadompart.v0_2.IVec3|null);

            /** PatternLinearFeature directionEdgeId */
            directionEdgeId?: (string|null);

            /** PatternLinearFeature count */
            count?: (number|null);

            /** PatternLinearFeature spacing */
            spacing?: (number|null);

            /** PatternLinearFeature spacingIsTotalExtent */
            spacingIsTotalExtent?: (boolean|null);

            /** PatternLinearFeature countMode */
            countMode?: (cadompart.v0_2.PatternInstanceCountMode|null);

            /** PatternLinearFeature skippedInstanceIndices */
            skippedInstanceIndices?: (number[]|null);
        }

        /** Represents a PatternLinearFeature. */
        class PatternLinearFeature implements IPatternLinearFeature {

            /**
             * Constructs a new PatternLinearFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IPatternLinearFeature);

            /** PatternLinearFeature sourceFeatureId. */
            public sourceFeatureId: string;

            /** PatternLinearFeature direction. */
            public direction?: (cadompart.v0_2.IVec3|null);

            /** PatternLinearFeature directionEdgeId. */
            public directionEdgeId: string;

            /** PatternLinearFeature count. */
            public count: number;

            /** PatternLinearFeature spacing. */
            public spacing: number;

            /** PatternLinearFeature spacingIsTotalExtent. */
            public spacingIsTotalExtent: boolean;

            /** PatternLinearFeature countMode. */
            public countMode: cadompart.v0_2.PatternInstanceCountMode;

            /** PatternLinearFeature skippedInstanceIndices. */
            public skippedInstanceIndices: number[];

            /**
             * Creates a new PatternLinearFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PatternLinearFeature instance
             */
            public static create(properties?: cadompart.v0_2.IPatternLinearFeature): cadompart.v0_2.PatternLinearFeature;

            /**
             * Encodes the specified PatternLinearFeature message. Does not implicitly {@link cadompart.v0_2.PatternLinearFeature.verify|verify} messages.
             * @param message PatternLinearFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IPatternLinearFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PatternLinearFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.PatternLinearFeature.verify|verify} messages.
             * @param message PatternLinearFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IPatternLinearFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PatternLinearFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PatternLinearFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.PatternLinearFeature;

            /**
             * Decodes a PatternLinearFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PatternLinearFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.PatternLinearFeature;

            /**
             * Verifies a PatternLinearFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PatternLinearFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PatternLinearFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.PatternLinearFeature;

            /**
             * Creates a plain object from a PatternLinearFeature message. Also converts values to other types if specified.
             * @param message PatternLinearFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.PatternLinearFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PatternLinearFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PatternLinearFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PatternCircularFeature. */
        interface IPatternCircularFeature {

            /** PatternCircularFeature sourceFeatureId */
            sourceFeatureId?: (string|null);

            /** PatternCircularFeature axisOrigin */
            axisOrigin?: (cadompart.v0_2.IVec3|null);

            /** PatternCircularFeature axisDirection */
            axisDirection?: (cadompart.v0_2.IVec3|null);

            /** PatternCircularFeature datumAxisId */
            datumAxisId?: (string|null);

            /** PatternCircularFeature count */
            count?: (number|null);

            /** PatternCircularFeature angleSpanRad */
            angleSpanRad?: (number|null);

            /** PatternCircularFeature equalSpacing */
            equalSpacing?: (boolean|null);

            /** PatternCircularFeature countMode */
            countMode?: (cadompart.v0_2.PatternInstanceCountMode|null);

            /** PatternCircularFeature skippedInstanceIndices */
            skippedInstanceIndices?: (number[]|null);
        }

        /** Represents a PatternCircularFeature. */
        class PatternCircularFeature implements IPatternCircularFeature {

            /**
             * Constructs a new PatternCircularFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IPatternCircularFeature);

            /** PatternCircularFeature sourceFeatureId. */
            public sourceFeatureId: string;

            /** PatternCircularFeature axisOrigin. */
            public axisOrigin?: (cadompart.v0_2.IVec3|null);

            /** PatternCircularFeature axisDirection. */
            public axisDirection?: (cadompart.v0_2.IVec3|null);

            /** PatternCircularFeature datumAxisId. */
            public datumAxisId: string;

            /** PatternCircularFeature count. */
            public count: number;

            /** PatternCircularFeature angleSpanRad. */
            public angleSpanRad: number;

            /** PatternCircularFeature equalSpacing. */
            public equalSpacing: boolean;

            /** PatternCircularFeature countMode. */
            public countMode: cadompart.v0_2.PatternInstanceCountMode;

            /** PatternCircularFeature skippedInstanceIndices. */
            public skippedInstanceIndices: number[];

            /**
             * Creates a new PatternCircularFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PatternCircularFeature instance
             */
            public static create(properties?: cadompart.v0_2.IPatternCircularFeature): cadompart.v0_2.PatternCircularFeature;

            /**
             * Encodes the specified PatternCircularFeature message. Does not implicitly {@link cadompart.v0_2.PatternCircularFeature.verify|verify} messages.
             * @param message PatternCircularFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IPatternCircularFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PatternCircularFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.PatternCircularFeature.verify|verify} messages.
             * @param message PatternCircularFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IPatternCircularFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PatternCircularFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PatternCircularFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.PatternCircularFeature;

            /**
             * Decodes a PatternCircularFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PatternCircularFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.PatternCircularFeature;

            /**
             * Verifies a PatternCircularFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PatternCircularFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PatternCircularFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.PatternCircularFeature;

            /**
             * Creates a plain object from a PatternCircularFeature message. Also converts values to other types if specified.
             * @param message PatternCircularFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.PatternCircularFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PatternCircularFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PatternCircularFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BooleanFeature. */
        interface IBooleanFeature {

            /** BooleanFeature op */
            op?: (cadompart.v0_2.BooleanOp|null);

            /** BooleanFeature toolFeatureId */
            toolFeatureId?: (string|null);

            /** BooleanFeature toolBodyId */
            toolBodyId?: (string|null);

            /** BooleanFeature targetBodyId */
            targetBodyId?: (string|null);
        }

        /** Represents a BooleanFeature. */
        class BooleanFeature implements IBooleanFeature {

            /**
             * Constructs a new BooleanFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IBooleanFeature);

            /** BooleanFeature op. */
            public op: cadompart.v0_2.BooleanOp;

            /** BooleanFeature toolFeatureId. */
            public toolFeatureId: string;

            /** BooleanFeature toolBodyId. */
            public toolBodyId: string;

            /** BooleanFeature targetBodyId. */
            public targetBodyId: string;

            /**
             * Creates a new BooleanFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BooleanFeature instance
             */
            public static create(properties?: cadompart.v0_2.IBooleanFeature): cadompart.v0_2.BooleanFeature;

            /**
             * Encodes the specified BooleanFeature message. Does not implicitly {@link cadompart.v0_2.BooleanFeature.verify|verify} messages.
             * @param message BooleanFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IBooleanFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BooleanFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.BooleanFeature.verify|verify} messages.
             * @param message BooleanFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IBooleanFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BooleanFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BooleanFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.BooleanFeature;

            /**
             * Decodes a BooleanFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BooleanFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.BooleanFeature;

            /**
             * Verifies a BooleanFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BooleanFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BooleanFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.BooleanFeature;

            /**
             * Creates a plain object from a BooleanFeature message. Also converts values to other types if specified.
             * @param message BooleanFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.BooleanFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BooleanFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BooleanFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ThickenFeature. */
        interface IThickenFeature {

            /** ThickenFeature surfaceFeatureId */
            surfaceFeatureId?: (string|null);

            /** ThickenFeature thickness */
            thickness?: (number|null);

            /** ThickenFeature bothSides */
            bothSides?: (boolean|null);
        }

        /** Represents a ThickenFeature. */
        class ThickenFeature implements IThickenFeature {

            /**
             * Constructs a new ThickenFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IThickenFeature);

            /** ThickenFeature surfaceFeatureId. */
            public surfaceFeatureId: string;

            /** ThickenFeature thickness. */
            public thickness: number;

            /** ThickenFeature bothSides. */
            public bothSides: boolean;

            /**
             * Creates a new ThickenFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ThickenFeature instance
             */
            public static create(properties?: cadompart.v0_2.IThickenFeature): cadompart.v0_2.ThickenFeature;

            /**
             * Encodes the specified ThickenFeature message. Does not implicitly {@link cadompart.v0_2.ThickenFeature.verify|verify} messages.
             * @param message ThickenFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IThickenFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ThickenFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ThickenFeature.verify|verify} messages.
             * @param message ThickenFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IThickenFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ThickenFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ThickenFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ThickenFeature;

            /**
             * Decodes a ThickenFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ThickenFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ThickenFeature;

            /**
             * Verifies a ThickenFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ThickenFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ThickenFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ThickenFeature;

            /**
             * Creates a plain object from a ThickenFeature message. Also converts values to other types if specified.
             * @param message ThickenFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ThickenFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ThickenFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ThickenFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an OffsetFacesFeature. */
        interface IOffsetFacesFeature {

            /** OffsetFacesFeature faces */
            faces?: (cadompart.v0_2.IFaceRef[]|null);

            /** OffsetFacesFeature distance */
            distance?: (number|null);
        }

        /** Represents an OffsetFacesFeature. */
        class OffsetFacesFeature implements IOffsetFacesFeature {

            /**
             * Constructs a new OffsetFacesFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IOffsetFacesFeature);

            /** OffsetFacesFeature faces. */
            public faces: cadompart.v0_2.IFaceRef[];

            /** OffsetFacesFeature distance. */
            public distance: number;

            /**
             * Creates a new OffsetFacesFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OffsetFacesFeature instance
             */
            public static create(properties?: cadompart.v0_2.IOffsetFacesFeature): cadompart.v0_2.OffsetFacesFeature;

            /**
             * Encodes the specified OffsetFacesFeature message. Does not implicitly {@link cadompart.v0_2.OffsetFacesFeature.verify|verify} messages.
             * @param message OffsetFacesFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IOffsetFacesFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OffsetFacesFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.OffsetFacesFeature.verify|verify} messages.
             * @param message OffsetFacesFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IOffsetFacesFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OffsetFacesFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OffsetFacesFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.OffsetFacesFeature;

            /**
             * Decodes an OffsetFacesFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OffsetFacesFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.OffsetFacesFeature;

            /**
             * Verifies an OffsetFacesFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OffsetFacesFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OffsetFacesFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.OffsetFacesFeature;

            /**
             * Creates a plain object from an OffsetFacesFeature message. Also converts values to other types if specified.
             * @param message OffsetFacesFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.OffsetFacesFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OffsetFacesFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for OffsetFacesFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MoveFaceFeature. */
        interface IMoveFaceFeature {

            /** MoveFaceFeature faces */
            faces?: (cadompart.v0_2.IFaceRef[]|null);

            /** MoveFaceFeature translation */
            translation?: (cadompart.v0_2.IVec3|null);

            /** MoveFaceFeature rotationAxisOrigin */
            rotationAxisOrigin?: (cadompart.v0_2.IVec3|null);

            /** MoveFaceFeature rotationAxisDirection */
            rotationAxisDirection?: (cadompart.v0_2.IVec3|null);

            /** MoveFaceFeature rotationAngleRad */
            rotationAngleRad?: (number|null);
        }

        /** Represents a MoveFaceFeature. */
        class MoveFaceFeature implements IMoveFaceFeature {

            /**
             * Constructs a new MoveFaceFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IMoveFaceFeature);

            /** MoveFaceFeature faces. */
            public faces: cadompart.v0_2.IFaceRef[];

            /** MoveFaceFeature translation. */
            public translation?: (cadompart.v0_2.IVec3|null);

            /** MoveFaceFeature rotationAxisOrigin. */
            public rotationAxisOrigin?: (cadompart.v0_2.IVec3|null);

            /** MoveFaceFeature rotationAxisDirection. */
            public rotationAxisDirection?: (cadompart.v0_2.IVec3|null);

            /** MoveFaceFeature rotationAngleRad. */
            public rotationAngleRad?: (number|null);

            /**
             * Creates a new MoveFaceFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MoveFaceFeature instance
             */
            public static create(properties?: cadompart.v0_2.IMoveFaceFeature): cadompart.v0_2.MoveFaceFeature;

            /**
             * Encodes the specified MoveFaceFeature message. Does not implicitly {@link cadompart.v0_2.MoveFaceFeature.verify|verify} messages.
             * @param message MoveFaceFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IMoveFaceFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MoveFaceFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.MoveFaceFeature.verify|verify} messages.
             * @param message MoveFaceFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IMoveFaceFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MoveFaceFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MoveFaceFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.MoveFaceFeature;

            /**
             * Decodes a MoveFaceFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MoveFaceFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.MoveFaceFeature;

            /**
             * Verifies a MoveFaceFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MoveFaceFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MoveFaceFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.MoveFaceFeature;

            /**
             * Creates a plain object from a MoveFaceFeature message. Also converts values to other types if specified.
             * @param message MoveFaceFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.MoveFaceFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MoveFaceFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MoveFaceFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SplitFeature. */
        interface ISplitFeature {

            /** SplitFeature splittingSketchId */
            splittingSketchId?: (string|null);

            /** SplitFeature splittingFaceId */
            splittingFaceId?: (string|null);

            /** SplitFeature consumeCutters */
            consumeCutters?: (boolean|null);
        }

        /** Represents a SplitFeature. */
        class SplitFeature implements ISplitFeature {

            /**
             * Constructs a new SplitFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ISplitFeature);

            /** SplitFeature splittingSketchId. */
            public splittingSketchId: string;

            /** SplitFeature splittingFaceId. */
            public splittingFaceId: string;

            /** SplitFeature consumeCutters. */
            public consumeCutters: boolean;

            /**
             * Creates a new SplitFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SplitFeature instance
             */
            public static create(properties?: cadompart.v0_2.ISplitFeature): cadompart.v0_2.SplitFeature;

            /**
             * Encodes the specified SplitFeature message. Does not implicitly {@link cadompart.v0_2.SplitFeature.verify|verify} messages.
             * @param message SplitFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ISplitFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SplitFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.SplitFeature.verify|verify} messages.
             * @param message SplitFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ISplitFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SplitFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SplitFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.SplitFeature;

            /**
             * Decodes a SplitFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SplitFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.SplitFeature;

            /**
             * Verifies a SplitFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SplitFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SplitFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.SplitFeature;

            /**
             * Creates a plain object from a SplitFeature message. Also converts values to other types if specified.
             * @param message SplitFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.SplitFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SplitFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SplitFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ThreadFeature. */
        interface IThreadFeature {

            /** ThreadFeature edge */
            edge?: (cadompart.v0_2.IEdgeRef|null);

            /** ThreadFeature cylindricalFace */
            cylindricalFace?: (cadompart.v0_2.IFaceRef|null);

            /** ThreadFeature designation */
            designation?: (string|null);

            /** ThreadFeature length */
            length?: (number|null);

            /** ThreadFeature rightHanded */
            rightHanded?: (boolean|null);

            /** ThreadFeature cosmetic */
            cosmetic?: (boolean|null);
        }

        /** Represents a ThreadFeature. */
        class ThreadFeature implements IThreadFeature {

            /**
             * Constructs a new ThreadFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IThreadFeature);

            /** ThreadFeature edge. */
            public edge?: (cadompart.v0_2.IEdgeRef|null);

            /** ThreadFeature cylindricalFace. */
            public cylindricalFace?: (cadompart.v0_2.IFaceRef|null);

            /** ThreadFeature designation. */
            public designation: string;

            /** ThreadFeature length. */
            public length: number;

            /** ThreadFeature rightHanded. */
            public rightHanded: boolean;

            /** ThreadFeature cosmetic. */
            public cosmetic: boolean;

            /**
             * Creates a new ThreadFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ThreadFeature instance
             */
            public static create(properties?: cadompart.v0_2.IThreadFeature): cadompart.v0_2.ThreadFeature;

            /**
             * Encodes the specified ThreadFeature message. Does not implicitly {@link cadompart.v0_2.ThreadFeature.verify|verify} messages.
             * @param message ThreadFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IThreadFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ThreadFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.ThreadFeature.verify|verify} messages.
             * @param message ThreadFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IThreadFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ThreadFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ThreadFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ThreadFeature;

            /**
             * Decodes a ThreadFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ThreadFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ThreadFeature;

            /**
             * Verifies a ThreadFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ThreadFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ThreadFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ThreadFeature;

            /**
             * Creates a plain object from a ThreadFeature message. Also converts values to other types if specified.
             * @param message ThreadFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ThreadFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ThreadFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ThreadFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a HelixFeature. */
        interface IHelixFeature {

            /** HelixFeature profileSketchId */
            profileSketchId?: (string|null);

            /** HelixFeature axisOrigin */
            axisOrigin?: (cadompart.v0_2.IVec3|null);

            /** HelixFeature axisDirection */
            axisDirection?: (cadompart.v0_2.IVec3|null);

            /** HelixFeature pitch */
            pitch?: (number|null);

            /** HelixFeature height */
            height?: (number|null);

            /** HelixFeature revolutions */
            revolutions?: (number|null);

            /** HelixFeature taper */
            taper?: (boolean|null);

            /** HelixFeature taperAngleRad */
            taperAngleRad?: (number|null);

            /** HelixFeature cut */
            cut?: (boolean|null);
        }

        /** Represents a HelixFeature. */
        class HelixFeature implements IHelixFeature {

            /**
             * Constructs a new HelixFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IHelixFeature);

            /** HelixFeature profileSketchId. */
            public profileSketchId: string;

            /** HelixFeature axisOrigin. */
            public axisOrigin?: (cadompart.v0_2.IVec3|null);

            /** HelixFeature axisDirection. */
            public axisDirection?: (cadompart.v0_2.IVec3|null);

            /** HelixFeature pitch. */
            public pitch: number;

            /** HelixFeature height. */
            public height: number;

            /** HelixFeature revolutions. */
            public revolutions: number;

            /** HelixFeature taper. */
            public taper: boolean;

            /** HelixFeature taperAngleRad. */
            public taperAngleRad: number;

            /** HelixFeature cut. */
            public cut: boolean;

            /**
             * Creates a new HelixFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HelixFeature instance
             */
            public static create(properties?: cadompart.v0_2.IHelixFeature): cadompart.v0_2.HelixFeature;

            /**
             * Encodes the specified HelixFeature message. Does not implicitly {@link cadompart.v0_2.HelixFeature.verify|verify} messages.
             * @param message HelixFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IHelixFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HelixFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.HelixFeature.verify|verify} messages.
             * @param message HelixFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IHelixFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HelixFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HelixFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.HelixFeature;

            /**
             * Decodes a HelixFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HelixFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.HelixFeature;

            /**
             * Verifies a HelixFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HelixFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HelixFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.HelixFeature;

            /**
             * Creates a plain object from a HelixFeature message. Also converts values to other types if specified.
             * @param message HelixFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.HelixFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HelixFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for HelixFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TransformBodyFeature. */
        interface ITransformBodyFeature {

            /** TransformBodyFeature bodyId */
            bodyId?: (string|null);

            /** TransformBodyFeature transform */
            transform?: (cadompart.v0_2.IMat4|null);

            /** TransformBodyFeature copy */
            copy?: (boolean|null);
        }

        /** Represents a TransformBodyFeature. */
        class TransformBodyFeature implements ITransformBodyFeature {

            /**
             * Constructs a new TransformBodyFeature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ITransformBodyFeature);

            /** TransformBodyFeature bodyId. */
            public bodyId: string;

            /** TransformBodyFeature transform. */
            public transform?: (cadompart.v0_2.IMat4|null);

            /** TransformBodyFeature copy. */
            public copy: boolean;

            /**
             * Creates a new TransformBodyFeature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TransformBodyFeature instance
             */
            public static create(properties?: cadompart.v0_2.ITransformBodyFeature): cadompart.v0_2.TransformBodyFeature;

            /**
             * Encodes the specified TransformBodyFeature message. Does not implicitly {@link cadompart.v0_2.TransformBodyFeature.verify|verify} messages.
             * @param message TransformBodyFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ITransformBodyFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TransformBodyFeature message, length delimited. Does not implicitly {@link cadompart.v0_2.TransformBodyFeature.verify|verify} messages.
             * @param message TransformBodyFeature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ITransformBodyFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TransformBodyFeature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TransformBodyFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.TransformBodyFeature;

            /**
             * Decodes a TransformBodyFeature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TransformBodyFeature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.TransformBodyFeature;

            /**
             * Verifies a TransformBodyFeature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TransformBodyFeature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TransformBodyFeature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.TransformBodyFeature;

            /**
             * Creates a plain object from a TransformBodyFeature message. Also converts values to other types if specified.
             * @param message TransformBodyFeature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.TransformBodyFeature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TransformBodyFeature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TransformBodyFeature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Feature. */
        interface IFeature {

            /** Feature id */
            id?: (string|null);

            /** Feature name */
            name?: (string|null);

            /** Feature suppressed */
            suppressed?: (boolean|null);

            /** Feature parameterIds */
            parameterIds?: (string[]|null);

            /** Feature bodyIdsOut */
            bodyIdsOut?: (string[]|null);

            /** Feature sketch */
            sketch?: (cadompart.v0_2.ISketchFeature|null);

            /** Feature extrude */
            extrude?: (cadompart.v0_2.IExtrudeFeature|null);

            /** Feature revolve */
            revolve?: (cadompart.v0_2.IRevolveFeature|null);

            /** Feature sweep */
            sweep?: (cadompart.v0_2.ISweepFeature|null);

            /** Feature loft */
            loft?: (cadompart.v0_2.ILoftFeature|null);

            /** Feature hole */
            hole?: (cadompart.v0_2.IHoleFeature|null);

            /** Feature fillet */
            fillet?: (cadompart.v0_2.IFilletFeature|null);

            /** Feature chamfer */
            chamfer?: (cadompart.v0_2.IChamferFeature|null);

            /** Feature shell */
            shell?: (cadompart.v0_2.IShellFeature|null);

            /** Feature draft */
            draft?: (cadompart.v0_2.IDraftFeature|null);

            /** Feature rib */
            rib?: (cadompart.v0_2.IRibFeature|null);

            /** Feature mirror */
            mirror?: (cadompart.v0_2.IMirrorFeature|null);

            /** Feature patternLinear */
            patternLinear?: (cadompart.v0_2.IPatternLinearFeature|null);

            /** Feature patternCircular */
            patternCircular?: (cadompart.v0_2.IPatternCircularFeature|null);

            /** Feature boolean */
            boolean?: (cadompart.v0_2.IBooleanFeature|null);

            /** Feature thicken */
            thicken?: (cadompart.v0_2.IThickenFeature|null);

            /** Feature offsetFaces */
            offsetFaces?: (cadompart.v0_2.IOffsetFacesFeature|null);

            /** Feature moveFace */
            moveFace?: (cadompart.v0_2.IMoveFaceFeature|null);

            /** Feature split */
            split?: (cadompart.v0_2.ISplitFeature|null);

            /** Feature thread */
            thread?: (cadompart.v0_2.IThreadFeature|null);

            /** Feature helix */
            helix?: (cadompart.v0_2.IHelixFeature|null);

            /** Feature transformBody */
            transformBody?: (cadompart.v0_2.ITransformBodyFeature|null);
        }

        /** Represents a Feature. */
        class Feature implements IFeature {

            /**
             * Constructs a new Feature.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IFeature);

            /** Feature id. */
            public id: string;

            /** Feature name. */
            public name: string;

            /** Feature suppressed. */
            public suppressed: boolean;

            /** Feature parameterIds. */
            public parameterIds: string[];

            /** Feature bodyIdsOut. */
            public bodyIdsOut: string[];

            /** Feature sketch. */
            public sketch?: (cadompart.v0_2.ISketchFeature|null);

            /** Feature extrude. */
            public extrude?: (cadompart.v0_2.IExtrudeFeature|null);

            /** Feature revolve. */
            public revolve?: (cadompart.v0_2.IRevolveFeature|null);

            /** Feature sweep. */
            public sweep?: (cadompart.v0_2.ISweepFeature|null);

            /** Feature loft. */
            public loft?: (cadompart.v0_2.ILoftFeature|null);

            /** Feature hole. */
            public hole?: (cadompart.v0_2.IHoleFeature|null);

            /** Feature fillet. */
            public fillet?: (cadompart.v0_2.IFilletFeature|null);

            /** Feature chamfer. */
            public chamfer?: (cadompart.v0_2.IChamferFeature|null);

            /** Feature shell. */
            public shell?: (cadompart.v0_2.IShellFeature|null);

            /** Feature draft. */
            public draft?: (cadompart.v0_2.IDraftFeature|null);

            /** Feature rib. */
            public rib?: (cadompart.v0_2.IRibFeature|null);

            /** Feature mirror. */
            public mirror?: (cadompart.v0_2.IMirrorFeature|null);

            /** Feature patternLinear. */
            public patternLinear?: (cadompart.v0_2.IPatternLinearFeature|null);

            /** Feature patternCircular. */
            public patternCircular?: (cadompart.v0_2.IPatternCircularFeature|null);

            /** Feature boolean. */
            public boolean?: (cadompart.v0_2.IBooleanFeature|null);

            /** Feature thicken. */
            public thicken?: (cadompart.v0_2.IThickenFeature|null);

            /** Feature offsetFaces. */
            public offsetFaces?: (cadompart.v0_2.IOffsetFacesFeature|null);

            /** Feature moveFace. */
            public moveFace?: (cadompart.v0_2.IMoveFaceFeature|null);

            /** Feature split. */
            public split?: (cadompart.v0_2.ISplitFeature|null);

            /** Feature thread. */
            public thread?: (cadompart.v0_2.IThreadFeature|null);

            /** Feature helix. */
            public helix?: (cadompart.v0_2.IHelixFeature|null);

            /** Feature transformBody. */
            public transformBody?: (cadompart.v0_2.ITransformBodyFeature|null);

            /** Feature body. */
            public body?: ("sketch"|"extrude"|"revolve"|"sweep"|"loft"|"hole"|"fillet"|"chamfer"|"shell"|"draft"|"rib"|"mirror"|"patternLinear"|"patternCircular"|"boolean"|"thicken"|"offsetFaces"|"moveFace"|"split"|"thread"|"helix"|"transformBody");

            /**
             * Creates a new Feature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Feature instance
             */
            public static create(properties?: cadompart.v0_2.IFeature): cadompart.v0_2.Feature;

            /**
             * Encodes the specified Feature message. Does not implicitly {@link cadompart.v0_2.Feature.verify|verify} messages.
             * @param message Feature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Feature message, length delimited. Does not implicitly {@link cadompart.v0_2.Feature.verify|verify} messages.
             * @param message Feature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IFeature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Feature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Feature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.Feature;

            /**
             * Decodes a Feature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Feature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.Feature;

            /**
             * Verifies a Feature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Feature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Feature
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.Feature;

            /**
             * Creates a plain object from a Feature message. Also converts values to other types if specified.
             * @param message Feature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.Feature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Feature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Feature
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ConfigurationParameterValue. */
        interface IConfigurationParameterValue {

            /** ConfigurationParameterValue parameterId */
            parameterId?: (string|null);

            /** ConfigurationParameterValue floatValue */
            floatValue?: (number|null);

            /** ConfigurationParameterValue intValue */
            intValue?: (number|Long|null);

            /** ConfigurationParameterValue boolValue */
            boolValue?: (boolean|null);

            /** ConfigurationParameterValue stringValue */
            stringValue?: (string|null);
        }

        /** Represents a ConfigurationParameterValue. */
        class ConfigurationParameterValue implements IConfigurationParameterValue {

            /**
             * Constructs a new ConfigurationParameterValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IConfigurationParameterValue);

            /** ConfigurationParameterValue parameterId. */
            public parameterId: string;

            /** ConfigurationParameterValue floatValue. */
            public floatValue?: (number|null);

            /** ConfigurationParameterValue intValue. */
            public intValue?: (number|Long|null);

            /** ConfigurationParameterValue boolValue. */
            public boolValue?: (boolean|null);

            /** ConfigurationParameterValue stringValue. */
            public stringValue?: (string|null);

            /**
             * Creates a new ConfigurationParameterValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConfigurationParameterValue instance
             */
            public static create(properties?: cadompart.v0_2.IConfigurationParameterValue): cadompart.v0_2.ConfigurationParameterValue;

            /**
             * Encodes the specified ConfigurationParameterValue message. Does not implicitly {@link cadompart.v0_2.ConfigurationParameterValue.verify|verify} messages.
             * @param message ConfigurationParameterValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IConfigurationParameterValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConfigurationParameterValue message, length delimited. Does not implicitly {@link cadompart.v0_2.ConfigurationParameterValue.verify|verify} messages.
             * @param message ConfigurationParameterValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IConfigurationParameterValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConfigurationParameterValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConfigurationParameterValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.ConfigurationParameterValue;

            /**
             * Decodes a ConfigurationParameterValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConfigurationParameterValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.ConfigurationParameterValue;

            /**
             * Verifies a ConfigurationParameterValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConfigurationParameterValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConfigurationParameterValue
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.ConfigurationParameterValue;

            /**
             * Creates a plain object from a ConfigurationParameterValue message. Also converts values to other types if specified.
             * @param message ConfigurationParameterValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.ConfigurationParameterValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConfigurationParameterValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ConfigurationParameterValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Configuration. */
        interface IConfiguration {

            /** Configuration id */
            id?: (string|null);

            /** Configuration name */
            name?: (string|null);

            /** Configuration parameterValues */
            parameterValues?: (cadompart.v0_2.IConfigurationParameterValue[]|null);

            /** Configuration suppressedFeatureIds */
            suppressedFeatureIds?: (string[]|null);

            /** Configuration isDefault */
            isDefault?: (boolean|null);
        }

        /** Represents a Configuration. */
        class Configuration implements IConfiguration {

            /**
             * Constructs a new Configuration.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.IConfiguration);

            /** Configuration id. */
            public id: string;

            /** Configuration name. */
            public name: string;

            /** Configuration parameterValues. */
            public parameterValues: cadompart.v0_2.IConfigurationParameterValue[];

            /** Configuration suppressedFeatureIds. */
            public suppressedFeatureIds: string[];

            /** Configuration isDefault. */
            public isDefault: boolean;

            /**
             * Creates a new Configuration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Configuration instance
             */
            public static create(properties?: cadompart.v0_2.IConfiguration): cadompart.v0_2.Configuration;

            /**
             * Encodes the specified Configuration message. Does not implicitly {@link cadompart.v0_2.Configuration.verify|verify} messages.
             * @param message Configuration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.IConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Configuration message, length delimited. Does not implicitly {@link cadompart.v0_2.Configuration.verify|verify} messages.
             * @param message Configuration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.IConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Configuration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Configuration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.Configuration;

            /**
             * Decodes a Configuration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Configuration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.Configuration;

            /**
             * Verifies a Configuration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Configuration
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.Configuration;

            /**
             * Creates a plain object from a Configuration message. Also converts values to other types if specified.
             * @param message Configuration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.Configuration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Configuration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Configuration
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CadompartFile. */
        interface ICadompartFile {

            /** CadompartFile versionMajor */
            versionMajor?: (number|null);

            /** CadompartFile versionMinor */
            versionMinor?: (number|null);

            /** CadompartFile name */
            name?: (string|null);

            /** CadompartFile description */
            description?: (string|null);

            /** CadompartFile units */
            units?: (cadompart.v0_2.LengthUnit|null);

            /** CadompartFile upAxis */
            upAxis?: (cadompart.v0_2.UpAxis|null);

            /** CadompartFile parameters */
            parameters?: (cadompart.v0_2.IParameter[]|null);

            /** CadompartFile datumPlanes */
            datumPlanes?: (cadompart.v0_2.IDatumPlane[]|null);

            /** CadompartFile datumAxes */
            datumAxes?: (cadompart.v0_2.IDatumAxis[]|null);

            /** CadompartFile datumPoints */
            datumPoints?: (cadompart.v0_2.IDatumPoint[]|null);

            /** CadompartFile coordinateSystems */
            coordinateSystems?: (cadompart.v0_2.ICoordinateSystem[]|null);

            /** CadompartFile features */
            features?: (cadompart.v0_2.IFeature[]|null);

            /** CadompartFile configurations */
            configurations?: (cadompart.v0_2.IConfiguration[]|null);

            /** CadompartFile activeConfigurationId */
            activeConfigurationId?: (string|null);
        }

        /** Represents a CadompartFile. */
        class CadompartFile implements ICadompartFile {

            /**
             * Constructs a new CadompartFile.
             * @param [properties] Properties to set
             */
            constructor(properties?: cadompart.v0_2.ICadompartFile);

            /** CadompartFile versionMajor. */
            public versionMajor: number;

            /** CadompartFile versionMinor. */
            public versionMinor: number;

            /** CadompartFile name. */
            public name: string;

            /** CadompartFile description. */
            public description: string;

            /** CadompartFile units. */
            public units: cadompart.v0_2.LengthUnit;

            /** CadompartFile upAxis. */
            public upAxis: cadompart.v0_2.UpAxis;

            /** CadompartFile parameters. */
            public parameters: cadompart.v0_2.IParameter[];

            /** CadompartFile datumPlanes. */
            public datumPlanes: cadompart.v0_2.IDatumPlane[];

            /** CadompartFile datumAxes. */
            public datumAxes: cadompart.v0_2.IDatumAxis[];

            /** CadompartFile datumPoints. */
            public datumPoints: cadompart.v0_2.IDatumPoint[];

            /** CadompartFile coordinateSystems. */
            public coordinateSystems: cadompart.v0_2.ICoordinateSystem[];

            /** CadompartFile features. */
            public features: cadompart.v0_2.IFeature[];

            /** CadompartFile configurations. */
            public configurations: cadompart.v0_2.IConfiguration[];

            /** CadompartFile activeConfigurationId. */
            public activeConfigurationId: string;

            /**
             * Creates a new CadompartFile instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CadompartFile instance
             */
            public static create(properties?: cadompart.v0_2.ICadompartFile): cadompart.v0_2.CadompartFile;

            /**
             * Encodes the specified CadompartFile message. Does not implicitly {@link cadompart.v0_2.CadompartFile.verify|verify} messages.
             * @param message CadompartFile message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: cadompart.v0_2.ICadompartFile, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CadompartFile message, length delimited. Does not implicitly {@link cadompart.v0_2.CadompartFile.verify|verify} messages.
             * @param message CadompartFile message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: cadompart.v0_2.ICadompartFile, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CadompartFile message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CadompartFile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cadompart.v0_2.CadompartFile;

            /**
             * Decodes a CadompartFile message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CadompartFile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cadompart.v0_2.CadompartFile;

            /**
             * Verifies a CadompartFile message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CadompartFile message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CadompartFile
             */
            public static fromObject(object: { [k: string]: any }): cadompart.v0_2.CadompartFile;

            /**
             * Creates a plain object from a CadompartFile message. Also converts values to other types if specified.
             * @param message CadompartFile
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: cadompart.v0_2.CadompartFile, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CadompartFile to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CadompartFile
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
