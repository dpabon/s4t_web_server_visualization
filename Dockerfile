FROM continuumio/miniconda3
WORKDIR /app
RUN apt update
RUN apt install -y npm
RUN npm install -g typescript
RUN git clone https://github.com/xcube-dev/xcube-viewer.git

COPY config.json ./xcube-viewer/src/resources/config.json

RUN cd xcube-viewer && npm install && npm run build 

RUN git clone https://github.com/xcube-dev/xcube.git

RUN echo $(ls -1 ./xcube-viewer/)

RUN  cp -rf ./xcube-viewer/dist ./xcube/xcube/webapi/viewer/

RUN conda env update --file ./xcube/environment.yml --prune --name base

RUN pip install numcodecs==0.15.1

RUN pip install -ve ./xcube

# fix projsee https://github.com/conda-forge/geopandas-feedstock/issues/63
ENV PROJ_LIB=/opt/conda/share/proj

EXPOSE 80

COPY config.yml ./config.yml

CMD xcube serve -c config.yml /data/data.zarr -p 80