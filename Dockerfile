FROM continuumio/miniconda3
WORKDIR /app
RUN conda config --add channels conda-forge
RUN conda install xcube
EXPOSE 80

# fix projsee https://github.com/conda-forge/geopandas-feedstock/issues/63
ENV PROJ_LIB=/opt/conda/share/proj

CMD xcube serve /data/data.zarr -p 80